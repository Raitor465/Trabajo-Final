// BuildingGrid.tsx
import React, { useState } from "react";
import { Edificios_menu } from "../../services/edificios-menu";
import baseimage from '../images/placeholders/base_ph.png'
import vacioimage from '../../public/placeholders/empty_ground_ph.png'
import { StaticImageData } from "next/image";


interface Props {
  buildingImages: (string | null) [];
  onEmptyGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({buildingImages = [], onEmptyGroundClick }) => {
  if (buildingImages.length == 0){
    buildingImages = ['','/placeholders/base_ph.png','null'];
  }
  // }else{
  //   buildingImages[buildingImages.length/2] = baseimage;
  // }
  
  const baseBuildingStyle = {
    backgroundImage: `url(${buildingImages[1]})`,
  };

  // console.log(buildingImages)
  const emptyGroundStyle = (index: number) => {
    const imageUrl = buildingImages[index];
    return {
      backgroundImage: `url(${imageUrl})`,
    };
  };

  return (
    <div className="flex flex-row">
      {Array.from({ length: 3 }).map((_, index) => (
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
