import React, { useState, useEffect } from "react";
import { actualizarRecursoJugador, getRecursoList } from "../../services/recursos";
import Edificios, { EdificioType } from "../../models/edificios";
import { fetchSave, updateSave } from "@/app/services/partida-seleccionada";

interface Props {
  onItemClick: (index: number) => void;
  playerId: number; //para identificar al jugador
  edificios: EdificioType[];
  onRecursosUpdate: (updatedRecursos: { agua_jugador: number; comida_jugador: number; chatarra_jugador: number, trabajadores_jugador: number}) => void;
  indiceTerreno : number;
}

const BuildingMenu: React.FC<Props> = ({ edificios, onItemClick, playerId, onRecursosUpdate, indiceTerreno}) => {
  const [edificiosList, setEdificiosList] = useState<EdificioType[]>([]);
  const [recursos, setRecursos] = useState<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number, trabajadores_jugador: number} | null>(null);
  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const recursosJugador = await getRecursoList();
        setRecursos(recursosJugador);
      } catch (error) {
        console.error("Error al cargar recursos:", error);
      }
    };
    
    //console.log(edificios[1].name)
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

  const recursosActuales = recursos;
  if (!recursosActuales) {
    console.error("Recursos no cargados");
    return;
  }
  const { agua_jugador, comida_jugador, chatarra_jugador, trabajadores_jugador } = recursosActuales;
  
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
    //console.log(index)
    for (const key in partidaActual.terreno){
      if (partidaActual.terreno[key] === -1 ){
        partidaActual.terreno[key] = edificioSeleccionado.id; // Reemplaza -1 con el ID del edificio seleccionado
        break;
      }
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
      trabajadores_jugador: trabajadores_jugador
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

