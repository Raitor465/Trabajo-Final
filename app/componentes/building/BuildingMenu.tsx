// BuildingMenu.tsx
import React from "react";
import Edificios, { Edificio } from "../../models/edificios";
import { connectDB } from "@/app/libs/gamedb";

interface Props {
  edificios: Edificio[],
  onItemClick: (index: number) => void;
}

const BuildingMenu: React.FC<Props> = ({ edificios, onItemClick }) => {
  return (
    <div className="p-5">
      {edificios.map((edificioLista, index) => (
        <div
          key={edificioLista.id}
          className="item-text bg-black cursor-pointer hover:bg-opacity-50"
          onClick={() => onItemClick(index)}
        >
          {edificioLista.name} : {edificioLista.descripcion}
        </div>
      ))}
    </div>
  );
};

export default BuildingMenu;
