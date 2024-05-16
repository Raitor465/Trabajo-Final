// BuildingGrid.tsx
import React, { useState, useEffect } from "react";
import { EdificioType } from "@/app/models/edificios";
import { fetchSave } from "@/app/services/partida-seleccionada";
import Partidas, { PartidaType } from "@/app/models/partidas";
import { Edificios_menu } from "../../services/edificios-menu";
import baseimage from '../images/placeholders/base_ph.png'
import vacioimage from '../../public/placeholders/empty_ground_ph.png'
import { StaticImageData } from "next/image";



interface Props {
  onEmptyGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick }) => {
  const [edificiosPartida, setEdificiosPartida] = useState<EdificioType[]>([]); 
  const [terreno, setTerreno] = useState<Record<string, number>>({});

  useEffect(() => {
    // Simula la carga de datos de partidaActual
    const fetchPartidaActual = async () => {
      // Supongamos que partidaActual se obtiene de una llamada a una API o algún servicio
    const data = await fetchSave(1000)
    
    setTerreno(terreno || {});
    

    fetchPartidaActual();
  }}, []);
  // partidaActual?.terreno
    
  // });

  const baseBuildingStyle = {
    backgroundImage: `url(${terreno[1]})`,
  };

  // console.log(buildingImages)
  const emptyGroundStyle = (index: number) => {
    const imageUrl = terreno[index];
    return {
      backgroundImage: `url(${imageUrl})`,
    };
  };

  return (
    <div className="flex flex-row">
      {edificiosPartida.map((_, index) => (
        <div
          key={index}
          style={index === 1 ? baseBuildingStyle : emptyGroundStyle(index)}
          className="h-48 w-48 bg-white bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-5"
          onClick={() => onEmptyGroundClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default BuildingGrid;
