// BuildingGrid.tsx
import React, { useState, useEffect, Key } from "react";
import { EdificioType } from "@/app/models/edificios";
import { fetchSave } from "@/app/services/partida-seleccionada";
import { set } from "mongoose";
//import Partidas, { PartidaType } from "@/app/models/partidas";
//import { getEdificioList } from "../../services/edificios-menu";
//import baseimage from '../images/placeholders/base_ph.png'
//import vacioimage from '../../public/placeholders/empty_ground_ph.png'
//import { StaticImageData } from "next/image";



interface Props {
  onEmptyGroundClick: (index: number) => void;
  edificios : EdificioType[];
}

const BuildingGrid: React.FC<Props> = ({onEmptyGroundClick, edificios}) => {
  const [edificiosPartida, setEdificiosPartida] = useState<EdificioType[]>([]); 
  const [terreno, setTerreno] = useState<Record<string, number>>({});
  const [buildingImages, setBuildingImages] = useState<string[]>()
  useEffect(() => {
    const fetchPartidaActual = async () => {
      try {
        const data = await fetchSave(1000);
        const terreno = data?.terreno;
        if (terreno && typeof terreno === 'object') {
          setTerreno(terreno);
          const newBuildingImages = [];
          for (const key in terreno) {
            if(Object.prototype.hasOwnProperty.call(terreno, key)) {
              //console.log(key)
              //console.log(terreno[key])
              const element = terreno[key];
              // console.log(element)
              const edificio = edificiosPartida.find(edificio => edificio.id === element);
              //console.log(edificio)
              if (edificio) {
                newBuildingImages.push(edificio.imagen);
                //console.log(newBuildingImages)
              }
            } 
          }
          setBuildingImages(newBuildingImages);
                   
        } else {
          setTerreno({});
          setBuildingImages([]);
        }       
      
        }catch (error) {
        console.error("Error al cargar los datos de la partida:", error);
      }
    };
    fetchPartidaActual();
    // console.log(buildingImages)

  }, []);
  //console.log(buildingImages)
  //console.log(edificios[0].id)
  // console.log(terreno.base)
  // console.log(terreno[-1])
  //console.log(edificios)

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
