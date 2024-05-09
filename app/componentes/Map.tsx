// // Map.tsx
// import React, { useEffect, useState } from "react";
// import "./Css/pantalla.css";
// import { getRecursoList, Recurso } from "../services/recursos";
// import { Edificios, getEdificiosList } from "../services/edificios-menu";
// import HorizontalList from "./HorizontalList";
// import BuildingMenu from "./BuildingMenu";
// import BuildingGrid from "./BuildingGrid";
// import Button from "./Button";

// const Map: React.FC = () => {
//   const [recursos, setRecursos] = useState<Recurso[]>([]);
//   const [edificios, setEdificios] = useState<Edificios[]>([]);
//   const [buildingImages, setBuildingImages] = useState(Array.from({ length: 3 }).fill(''));
//   const [showBuildMenu, setShowBuildMenu] = useState(false);
//   const [showConstruir, setShowConstruir] = useState(false);
//   const [selectedBuilding, setSelectedBuilding] = useState<Edificios>();
//   const [selectedGround, setSelectedGround] = useState<number>();
  

//   useEffect(() => {
//     const fetchData = async () => {
//       const recursosData = await getRecursoList();
//       const edificiosData = await getEdificiosList();
//       setRecursos(recursosData.list);
//       setEdificios(edificiosData.list);
//     };

//     fetchData();
//   }, []);

//   const handleEmptyGroundClick = (index: number) => {
//     setShowBuildMenu(true);
//     setSelectedGround(index);
//   };

//   const handleItemClick = (index: number) => {
//     setShowConstruir(true);
//     setSelectedBuilding(edificios[index]);
//   };

//   const handleConstruirClick = (index: number) => {
//     const newBuildingImages = [...buildingImages];
//     newBuildingImages[index] = selectedBuilding?.imagen || "";
//     setBuildingImages(newBuildingImages);
//     setShowBuildMenu(false);
//   };

//   return (
//     <main>
//       <div className="h-screen w-screen bg-slate-900 flex flex-col">
//         <div className="flex justify-start items-start">
//           <HorizontalList items={recursos} />
//         </div>
//         <div className="flex flex-1 flex-col justify-end items-center">
//           <BuildingGrid buildingImages={buildingImages} onEmptyGroundClick={handleEmptyGroundClick} />
//           <div className="h-48 w-screen bg-slate-600">
//             {showBuildMenu && (
//               <div className="h-48 w-1/2 bg-white">
//                 <BuildingMenu edificios={edificios} onItemClick={handleItemClick} />
//                 {showConstruir && (
//                   <div className="flex flex-row justify-end items-end">
//                     <Button onClick={() => handleConstruirClick(selectedGround || 0)} text="Construir" />
//                     <Button onClick={() => setShowBuildMenu(false)} text="Cancelar" />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Map;
'use client'
import React, { useState } from "react";
import { Recurso } from "../services/recursos";
import { Edificios } from "../services/edificios-menu";
import BuildingMenu from "./building/BuildingMenu";
import BuildingGrid from "./building/BuildingGrid";
import Resources from "./Resources";
import Button from "./ui/Button";
import { StaticImageData } from "next/image";
import baseimg from "../public/placeholders/base_ph.png"

interface MapProps {
  recursos: Recurso[];
  edificios: Edificios[];
}

const Map: React.FC<MapProps> = ({recursos, edificios}) => {
  const [buildingImages, setBuildingImages] = useState<StaticImageData[]>([]);
  const [showBuildMenu, setShowBuildMenu] = useState(false);
  const [showConstruir, setShowConstruir] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Edificios>();
  const [selectedGround, setSelectedGround] = useState<number>();
  
  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true);
    setSelectedGround(index);
  };

  const handleItemClick = (index: number) => {
    setShowConstruir(true);
    setSelectedBuilding(edificios[index]);
  };

  const handleConstruirClick = (index: number) => {
    const newBuildingImages = [...buildingImages];
    newBuildingImages[1] = baseimg;
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
        <div className=" flex flex-1 flex-col justify-end items-center">
          <BuildingGrid buildingImages={buildingImages} onEmptyGroundClick={handleEmptyGroundClick} />
          <div className="h-48 w-screen flex  bg-slate-600">
            {showBuildMenu && (
              <div className="w-1/2 bg-white">
                <BuildingMenu edificios={edificios} onItemClick={handleItemClick} />
                {showConstruir && (
                  <div className="flex flex-row justify-end items-end">
                    <Button onClick={() => handleConstruirClick(selectedGround || 0)} text={"Construir"} className="bg-green-600 mr-1"/>
                    <Button onClick={() => setShowBuildMenu(false)} text={"Cancelar"} className="bg-red-600 mr-2"/>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Map;
