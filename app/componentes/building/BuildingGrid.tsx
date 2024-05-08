// BuildingGrid.tsx
import React, { useState } from "react";
import { Edificios } from "../../services/edificios-menu";

interface Props {
  buildingImages: (string | null)[];
  onEmptyGroundClick: (index: number) => void;
}

const BuildingGrid: React.FC<Props> = ({ buildingImages, onEmptyGroundClick }) => {
  const baseBuildingStyle = {
    backgroundImage: "url(/placeholders/base_ph.png)",
  };

  const emptyGroundStyle = (index: number) => {
    const imageUrl = buildingImages[index] || "/placeholders/empty_ph.png";
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
          className="h-48 w-48 bg-cover bg-opacity-0 cursor-pointer hover:bg-opacity-10"
          onClick={() => onEmptyGroundClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default BuildingGrid;
