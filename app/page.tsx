'use client'
import React, {useEffect, useState} from "react";
import {getRecursoList, type Recurso} from "./service/recursos"
import './Css/pantalla.css'
import { Edificios, findEdificiosById, getEdificiosList } from "./service/edificios-menu";

//---------------------------------------------------------------------
// botones edificios
//---------------------------------------------------------------------
export default function Map() {
  /* Zoom al mapa, sin uso todavía
  const mapRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<number>(1);

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const deltaY = e.deltaY;
    zoomRef.current += deltaY > 0 ? -0.1 : 0.1;

    if (mapRef.current) {
      mapRef.current.style.transform = scale(${zoomRef.current});
    }
  };*/

//---------------------------------------------------------------------
// parte superior recursos 
//---------------------------------------------------------------------
  const HorizontalList: React.FC<{ items: Recurso[] }> = ({ items }) => {
    return (
      <div className="horizontal-list-container p-2"> {/* Estilo de Flexbox */}
        {items.map((item) => (
         <div key={item.id} className="list-item"> {/* Cada par "nombre: cantidad" */}
           <span className="item-text">
             {item.name} : {item.cantidad}
           </span>
         </div>
       ))}
     </div>
   );
  };

//---------------------------------------------------------------------
//aca muestra todo lo de recursos
//---------------------------------------------------------------------
  
const [recursos, setRecursos] = useState<Recurso[]>([]); // Estado para la lista
const [showCircle, setShowCircle] = useState(false); // Estado para mostrar el círculo grande
const [edificios, setEdificios] = useState<Edificios[]>([]);

useEffect(() => {
  const fetchData = async () => {
    const result = await getRecursoList(); // Obtener datos
    const edificios = await getEdificiosList(); // Obtener lista de edificios
    setRecursos(result.list); // Guardar datos en el estado
    setEdificios(edificios.list) // Guardar edificios en su estado
  };

  fetchData(); // Ejecuta para obtener datos al montar el componente
}, []); // Efecto se ejecuta una vez

//--- Edificios --------------------------------------------------
const [buildingImages, setBuildingImages] = useState(Array.from({ length: 3 }).fill(''));
const [showBuildMenu, setShowBuildMenu] = useState(false)
const [showConstruir, setShowConstruir] = useState(false)
const [selectedBuilding, setSelectedBuilding] = useState<Edificios>()
const [selectedGround, setSelectedGround] = useState(Number)
//const pozo_image = 'url(/placeholders/building1_ph.png)'

const BuildingsMenu: React.FC<{ items: Edificios[], onItemClick: (index: number) => void }> = ({ items, onItemClick }) => {
  return (
    <div className=" p-5"> {/* Estilo de Flexbox */}
      {items.map((item, index) => (
       <div 
        key={item.id} 
        className="item-text bg-black cursor-pointer hover:bg-opacity-50"
        onClick={() => onItemClick(index)}
      > {/* Cada par "nombre: descripcion" */}
          {item.name} : {item.descripcion}
       </div>
     ))}
   </div>
 );
};

const handleItemClick = (index: number) => {
  setShowConstruir(true)
  setSelectedBuilding(edificios[index])
  console.log(selectedBuilding)
  //console.log(edificios[index]);
}

const handleConstruirClick = (index : number) => {
  const newBuildingImages = [...buildingImages]
  newBuildingImages[index] = newBuildingImages[index] === '' ?  selectedBuilding?.imagen: '';
  setBuildingImages(newBuildingImages)
  setShowBuildMenu(false)
}

//--- Lógica de edificios ------------------------------------------------
  
//--- Estados de edificios--- 
// El edificio de la base  
  const base_building = { 
    style: { backgroundImage: 'url(/placeholders/base_ph.png)' },
    className: 'h-48 w-48 bg-cover bg-opacity-0 hover:bg-opacity-5 cursor-pointer',
    //onClick: handleClick
  };

  // El terreno vacio
  const empty_ground = (index: number) => ({
    style: { backgroundImage: buildingImages[index] },
    className: 'h-48 w-48 bg-cover bg-white bg-opacity-0 cursor-pointer hover:bg-opacity-10',
    onClick: () => handleEmptyGroundClick(index)
  });

  // El terreno con un edificio construido
  const building = (index: number) => ({
    style: { backgroundImage: buildingImages[index] },
    className: 'h-48 w-48 bg-cover bg-white bg-opacity-0 cursor-pointer hover:bg-opacity-10', 
    //onClick: () => handleClick(index)
  });

  const handleEmptyGroundClick = (index: number) => {
    setShowBuildMenu(true)
    setSelectedGround(index)
    /*const newBuildingImages = [...buildingImages];
    newBuildingImages[index] = newBuildingImages[index] === '' ? 'url(/placeholders/building1_ph.png)' : '';
    setBuildingImages(newBuildingImages);*/
  };

  const buildings = Array.from({ length: 3 }).map((_, index) => {
    if (index === 1) {
      return <div key={index} style={base_building.style} className={base_building.className}></div>;
    } else {
      return <div key={index} style={(empty_ground(index).style as React.CSSProperties)} className={empty_ground(index).className} onClick={() => handleEmptyGroundClick(index)}></div>;
    }
  });

  //---- Pantalla --------------------------------------------
    return(
      <main>
      {/* Contenedor principal que ocupa toda la altura y anchura de la pantalla */}
      <div className="h-screen w-screen bg-slate-900 flex flex-col"> 
        {/* Sección superior para mantener el HorizontalList en la parte superior izquierda */}
        <div className="flex justify-start items-start"> 
          <HorizontalList items={recursos} /> {/* Mostrar la lista en la parte superior izquierda */}
        </div>
        {/* Sección inferior para el resto del contenido, centrado horizontalmente y abajo */}
        <div className="flex flex-1 flex-col justify-end items-center"> 
          <div className="flex flex-row">
            {buildings} {/* Mostrar edificios */}
          </div>
          <div className="h-48 w-screen bg-slate-600">
          {showBuildMenu &&
            <div className="h-48 w-1/2 bg-white">
              <BuildingsMenu items={edificios} onItemClick={handleItemClick}/>
              {showConstruir && 
              <div className="flex flex-row justify-end items-end">
                <div className="bg-black m-3 px-2 py-2 cursor-pointer hover:bg-opacity-50" onClick={()=>(handleConstruirClick(selectedGround))}>Construir</div>
                <div className="bg-black m-3 px-2 py-2 cursor-pointer hover:bg-opacity-50" onClick={() => (setShowBuildMenu(false))}>Cancelar</div>
              </div>
              }
            </div>
            }
          </div>
        </div>
      </div>
    </main>
    )
  
}