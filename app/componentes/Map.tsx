// export default Map;
import React, { useState } from "react";
//import { Recurso } from "../services/recursos";
//import { Edificio } from "../models/edificios";
//import BuildingMenu from "./building/BuildingMenu";
import BuildingGrid from "./building/BuildingGrid";
import Resources from "./Resources";
import Button from "./ui/Button";
//import baseimg from "../public/placeholders/base_ph.png"
import { getEdificioList } from "../services/edificios-menu";
import { PartidaType } from "../models/partidas";
import { EdificioType } from "../models/edificios";
import BuildingMenu from "./building/BuildingMenu";

interface MapProps {
  recursos: PartidaType['recursos'];
  edificios: EdificioType[] ;
}

const Map: React.FC<MapProps> = ({recursos, edificios}) => {
  const [buildingImages, setBuildingImages] = useState<string[]>(Array.from({ length: 5 }, () => ''));
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [showConstruir, setShowConstruir] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType>();
  const [selectedGround, setSelectedGround] = useState<number>();
  
  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setSelectedGround(index);
  };

  const handleItemClick = (index: number) => {
    setShowConstruir(true);
    setSelectedBuilding(edificios[index]);
  };
  //console.log(recursos)

  const handleConstruirClick = (index: number) => {
    const newBuildingImages = [...buildingImages];
    newBuildingImages[1] = '/placeholders/base_ph.png';
    const selectedImage = selectedBuilding?.imagen || null;
    if (selectedImage !== null && index !== 1){
      newBuildingImages[index] = selectedImage;
      setBuildingImages(newBuildingImages);
    }
    setShowBuildMenu(false);
  };
  

  
  return (
    <main>
      <div className="h-screen w-screen bg-slate-900 flex flex-col">
        <div className="flex justify-start items-start bg-black">
          <Resources items={recursos} />
        </div>
        <div className="flex flex-1 flex-col justify-end items-center relative">
          <BuildingGrid  edificios={edificios} onEmptyGroundClick={handleEmptyGroundClick} />
          <div className="h-48 w-screen flex relative">
            {/* Imagen de starcraf2 */}
            <img src="/placeholders/marco-starcraft2-png.png" alt="marco de abajo" className="w-full h-48" />
            {/* Contenedor de la imagen y la parte superior de BuildingMenu */}
            {showBuildMenu && (
              <div className="absolute top-0 w-full">
                <div className="w-1/2 ">
                  <BuildingMenu playerId={1000} edificios={edificios} onItemClick={handleItemClick} />
                  {showConstruir && (
                    <div className="flex flex-row justify-end items-end">
                      <Button onClick={() => handleConstruirClick(selectedGround || 0)} text={"Construir"} className="bg-green-600 mr-1"/>
                      <Button onClick={() => setShowBuildMenu(false)} text={"Cancelar"} className="bg-red-600 mr-2"/>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Map;
