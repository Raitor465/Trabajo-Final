import React, { useState, useEffect } from "react";
//import { Edificios_menu } from "../../services/edificios-menu";
import { actualizarRecursoJugador, getRecursoList } from "../../services/recursos";
import { connectDB } from "@/app/libs/gamedb";
import Edificios, { EdificioType } from "../../models/edificios";
import { PartidaType } from "@/app/models/partidas";

interface Props {
  onItemClick: (index: number) => void;
  playerId: number; //para identificar al jugador
}

const BuildingMenu: React.FC<Props> = ({ onItemClick, playerId }) => {
  const [edificiosList, setEdificiosList] = useState<EdificioType[]>([]);
  const [recursos, setRecursos] = useState<{ agua_jugador: number, comida_jugador: number, chatarra_jugador: number } | null>(null);

  useEffect(() => {
    const cargarRecursos = async () => {
      try {
        const recursosJugador = await getRecursoList(playerId);
        setRecursos(recursosJugador);
      } catch (error) {
        console.error("Error al cargar recursos:", error);
      }
    };

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

    // Actualizar los recursos después de la construcción del edificio
    await Promise.all([
      actualizarRecursoJugador(playerId, { name: "agua", cantidad: agua_jugador - agua }),
      actualizarRecursoJugador(playerId, { name: "comida", cantidad: comida_jugador - comida }),
      actualizarRecursoJugador(playerId, { name: "chatarra", cantidad: chatarra_jugador - chatarra })
    ]);

    // Recargar los recursos después de la actualización
    //await cargarRecursos();
  } catch (error) {
    console.error("Error al crear el edificio:", error);
  }
};

  
  return (
    <div className="p-5">
      {edificiosList.map((edificio, index) => (
        <div
          key={edificio.id}
          className="item-text bg-black cursor-pointer hover:bg-opacity-50"
          onClick={() => handleItemClick(index)} // Aquí llamamos a la función handleItemClick en lugar de onItemClick directamente
        >
          {edificio.name} : {edificio.descripcion}
        </div>
      ))}
    </div>
  );
};

export default BuildingMenu;

