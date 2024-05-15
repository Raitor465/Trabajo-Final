//<<<<<<< funcionalidad-edificios
import React, { useState, useEffect } from "react";
import { Edificios_menu } from "../../services/edificios-menu";
import { Recurso, actualizarRecurso, findRecursoByName, getRecursoList } from "../../services/recursos";
//=======
// BuildingMenu.tsx
//<<<<<<< prueba-db
import React, { useEffect, useState } from "react";
import { EdificioType } from "../../models/edificios";
interface Props {
  onItemClick: (index: number) => void;
}

const BuildingMenu: React.FC<Props> = ({ onItemClick }) => {
  
  const [edificiosList, setEdificiosList] = useState<EdificioType[]>([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch('http://localhost:3000/api/buildings');
      const data: EdificioType[] = await response.json()
      data.shift()
      setEdificiosList(data);
    };

    fetchBuildings();
  }, []);

//=======
//import Edificios, { Edificio } from "../../models/edificios";
import { connectDB } from "@/app/libs/gamedb";
//>>>>>>> page-organizado-componentes

interface Props {
  edificios: Edificios_menu[],
  onItemClick: (index: number) => void;
}

const BuildingMenu: React.FC<Props> = ({ edificios, onItemClick }) => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);

  useEffect(() => {
    // Cargar recursos iniciales o cualquier otra lógica necesaria al montar el componente
    cargarRecursos();

  // Configura un temporizador para realizar consultas periódicas cada 5 segundos
    //const intervalId = setInterval(cargarRecursos, 5000);

  // Limpia el temporizador al desmontar el componente para evitar fugas de memoria
    //return () => clearInterval(intervalId);
}, []);

  const cargarRecursos = async () => {
    try {
      const listaRecursos = await getRecursoList();
      setRecursos(listaRecursos);
    } catch (error) {
      console.error("Error al cargar recursos:", error);
    }
  };

  const handleItemClick = async (index: number) => {
    const edificioSeleccionado = edificios[index];
    const costoRecursos = edificioSeleccionado.costoRecursos;
    for (const recurso of costoRecursos) {
      const recursoExistente = await findRecursoByName(recurso.name);
      if (!recursoExistente || recursoExistente.cantidad < recurso.cantidad) {
        console.error(`No se tienen suficientes ${recurso.name} para construir el edificio.`);
        return; // Salir de la función si no hay suficientes recursos
      }
    }

    try {
      await onItemClick(index);
      
      // Actualizar la cantidad de recursos después de construir el edificio
      for (const recurso of costoRecursos) {
        await actualizarRecurso(recurso);
      }

      cargarRecursos(); 

      // Lógica adicional después de crear el edificio y actualizar los recursos
    } catch (error) {
      console.error("Error al crear el edificio:", error);
      // Manejar el error de alguna manera
    }
  };
  
//>>>>>>> page-organizado-componentes
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

