// BuildingGrid.tsx
//<<<<<<< prueba-db
import React, { useState, useEffect } from "react";
import { EdificioType } from "@/app/models/edificios";
import { partidaActual } from "@/app/services/partida-seleccionada";
//import Partidas, { PartidaType } from "@/app/models/partidas";
//import { Edificios } from "../../services/edificios-menu";
//import baseimage from '../images/placeholders/base_ph.png'
//import vacioimage from '../../public/placeholders/empty_ground_ph.png'
//import { StaticImageData } from "next/image";
//=======
import React, { useState } from "react";
import { Edificios_menu } from "../../services/edificios-menu";
import baseimage from '../images/placeholders/base_ph.png'
import vacioimage from '../../public/placeholders/empty_ground_ph.png'
import { StaticImageData } from "next/image";
//>>>>>>> page-organizado-componentes


interface Props {
  onEmptyGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick }) => {

  const [edificiosPartida, setEdificiosPartida] = useState<EdificioType[]>([]); 

  // partidaActual?.terreno
    
  // });

  const baseBuildingStyle = {
    //backgroundImage: `url(${partidaActual?.terreno[1]})`,
  };

  // console.log(buildingImages)
  const emptyGroundStyle = (index: number) => {
    //const imageUrl = partidaActual?.terreno[index];
    return {
      //backgroundImage: `url(${imageUrl})`,
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
