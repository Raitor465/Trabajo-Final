// BuildingMenu.tsx
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

  return (
    <div className="p-5">
      {edificiosList.map((edificio, index) => (
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
