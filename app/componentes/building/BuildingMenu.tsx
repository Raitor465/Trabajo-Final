// BuildingMenu.tsx
import React from "react";
import { Edificios } from "../../services/edificios-menu";

interface Props {
  edificios: Edificios[];
  onItemClick: (index: number) => void;
}

const BuildingMenu: React.FC<Props> = ({ edificios, onItemClick }) => {
  return (
    <div className="p-5">
      {edificios.map((edificio, index) => (
        <div
          key={edificio.id}
          className="item-text bg-black cursor-pointer hover:bg-opacity-50"
          onClick={() => onItemClick(index)}
        >
          {edificio.name} : {edificio.descripcion}
        </div>
      ))}
    </div>
  );
};

export default BuildingMenu;
