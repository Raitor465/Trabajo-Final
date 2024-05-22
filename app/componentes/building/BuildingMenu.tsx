import React, { useState, useEffect } from "react";
//import { Edificios_menu } from "../../services/edificios-menu";
import { actualizarRecursoJugador, getRecursoList } from "../../services/recursos";
//import { connectDB } from "@/app/libs/gamedb";
import Edificios, { EdificioType } from "../../models/edificios";
//import { PartidaType } from "@/app/models/partidas";
import Button from "../ui/Button";
import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";
import BuildingGrid from "./BuildingGrid";

interface Props {
  onItemClick: (index: number) => void;
  playerId: number; //para identificar al jugador
  edificios: EdificioType[];
  onRecursosUpdate: (updatedRecursos: { agua_jugador: number; comida_jugador: number; chatarra_jugador: number }) => void;
  indiceTerreno : number;
  //terrenoBool : Record<string, boolean>;
}

const BuildingMenu: React.FC<Props> = ({ edificios, onItemClick, playerId, onRecursosUpdate, indiceTerreno}) => {
  const [edificiosList, setEdificiosList] = useState<EdificioType[]>([]);
  const [recursos, setRecursos] = useState<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number } | null>(null);
  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const recursosJugador = await getRecursoList();
        setRecursos(recursosJugador);
      } catch (error) {
        console.error("Error al cargar recursos:", error);
      }
    };
    //console.log(terrenoBool)

    const fetchBuildings = async () => {
      const response = await fetch("http://localhost:3000/api/buildings");
      const data: EdificioType[] = await response.json();
      data.shift();
      setEdificiosList(data);
    };

    cargarRecursos();
    fetchBuildings();
  }, [playerId]);
  


  const handleItemClick = async (index: number) => {
  const edificioSeleccionado = edificiosList[index];
  const { agua, comida, chatarra } = edificioSeleccionado.costoRecursoscreacion;
  
  //eleccion de que si o que no
  //const posicionDisponible = terrenoBool;
  //console.log(posicionDisponible)

  // if (!posicionDisponible) {
  //   console.error("La posición seleccionada en el terreno no está disponible.");
  //   return;
  // }

  const recursosActuales = recursos;
  if (!recursosActuales) {
    console.error("Recursos no cargados");
    return;
  }
  const { agua_jugador, comida_jugador, chatarra_jugador } = recursosActuales;
  
  try {
    // Verificar si hay suficientes recursos para construir el edificio
    if (agua_jugador < agua) {
      console.error("No hay suficiente agua para construir el edificio.");
      return;
    }

    if (comida_jugador < comida) {
      console.error("No hay suficiente comida para construir el edificio.");
      return;
    }

    if (chatarra_jugador < chatarra) {
      console.error("No hay suficiente chatarra para construir el edificio.");
      return;
    }

    await onItemClick(index);

    const partidaActual = await fetchSave(1000);
    if (!partidaActual) {
        throw new Error('No se encontró la partida del jugador.');
    }
    let i = 0
    console.log(index)
    for (const key in partidaActual.terreno){
      if (i == index && partidaActual.terreno[key] === -1 ){
        partidaActual.terreno[key] = edificioSeleccionado.id; // Reemplaza -1 con el ID del edificio seleccionado
        break;
      }
      i++
    }

    await updateSave(partidaActual);
    
    

    // Actualizar los recursos después de la construcción del edificio
    await Promise.all([
      actualizarRecursoJugador({ name: "agua", cantidad:  agua }),
      actualizarRecursoJugador({ name: "comida", cantidad: comida }),
      actualizarRecursoJugador({ name: "chatarra", cantidad: chatarra })    
    ]);
    //console.log(agua_jugador)
    
    const recursosActualizados = {
      agua_jugador : agua_jugador - agua,
      comida_jugador : comida_jugador - comida,
      chatarra_jugador : chatarra_jugador - chatarra,
    };

    setRecursos(recursosActualizados);
    onRecursosUpdate(recursosActualizados);

    // Recargar los recursos después de la actualización
    //await cargarRecursos();
  } catch (error) {
    console.error("Error al crear el edificio:", error);
  }
};


  
  return (
    <div className="p-5">
      {edificiosList.map((edificiosList, index) => (
        <div
          key={edificiosList.id}
          className={`item-text bg-black cursor-pointer hover:bg-opacity-50 `}
          onClick={() => handleItemClick(index)} // Aquí llamamos a la función handleItemClick en lugar de onItemClick directamente
        >
           {`${edificiosList.name} : ${edificiosList.descripcion}`}

        </div>
      ))}
    </div>
  );
};

export default BuildingMenu;

