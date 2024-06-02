import React, { useState, useEffect } from "react";
import { EdificioType } from "@/app/models/edificios";
import { calculateTimeForBuildingPozo, calculateAmountForBuildingPozo } from "../Edificios-funcional/pozo-fun"
import { calculateTimeForBuildingCriadero, calculateAmountForBuildingCriadero } from "../Edificios-funcional/criadero-fun";
import { calculateTimeForBuildingChatarreria, calculateAmountForBuildingChatarreria } from "../Edificios-funcional/chatarreria-fun";
import Button from "../ui/Button";

interface Props {
  edificios: EdificioType[];
  onBuildGroundClick: (index: number) => void;
}

/*
  falta arreglar el html par que quede bien ubicado y que solo aparezca cuando haces click al edificio y no todos los edificios de una.
  falta que cuando suba de nivel se guarde el nivel en la base de datos.
  falta poner el costo de mejora la cantidad necesaria que necesita de obreros para subir de nivel.
  falta poner que el costo de mejora de la base sea con recursos y no con obreros
  falta que se creen obreros en la base y que se guarden en la base de datos.
  falta poder agregar los obreros en los edificios. (creo que aca voy a necesitar agregar algo en la base de datos pero nose).
*/

const BuildingEdif: React.FC<Props> = ({ edificios, onBuildGroundClick }) => {
  const [selectedBuilding, setSelectedBuilding] = useState<EdificioType | null>(null);
  const [nivel, setNivel] = useState<number>(1);

  const handleItemClick = (index: number) => {
    const edificioSeleccionado = edificios[index];
    setSelectedBuilding(edificioSeleccionado);
    setNivel(edificioSeleccionado.nivel || 1);
  };

  const handleMejorarEdificio = () => {
    if (selectedBuilding && nivel < 3) {
      const nuevoNivel = nivel + 1;
      setNivel(nuevoNivel);
      selectedBuilding.nivel = nuevoNivel;
      setSelectedBuilding({ ...selectedBuilding });
    }
  };

  const getIntervalTime = (building: EdificioType, nivel: number): number => { //cantidad de tiempo en el cual tiene dependiendo el nivel
    switch (building.name) {
      case 'Pozo':
        return calculateTimeForBuildingPozo(nivel);
      case 'Criadero':
        return calculateTimeForBuildingCriadero(nivel);
      case 'Chatarreria':
        return calculateTimeForBuildingChatarreria(nivel);
      default:
        return 30000; // Valor por defecto
    }
  };

  const getResourceAmount = (building: EdificioType, nivel: number): number => { //cantidad de recurso en el cual genera dependiendo el nivel
    switch (building.name) {
      case 'Pozo':
        return calculateAmountForBuildingPozo(nivel);
      case 'Criadero':
        return calculateAmountForBuildingCriadero(nivel);
      case 'Chatarreria':
        return calculateAmountForBuildingChatarreria(nivel);
      default:
        return 25; // Valor por defecto
    }
  };

  useEffect(() => {
    if (selectedBuilding) {
      const intervalo = getIntervalTime(selectedBuilding, nivel);
      const cantidadRecursoConseguido = getResourceAmount(selectedBuilding, nivel);
      
      const intervaloGeneracion = setInterval(async () => {
        console.log(`Generando ${cantidadRecursoConseguido} cada ${intervalo / 1000} segundos`);
      }, intervalo);

      return () => clearInterval(intervaloGeneracion);
    }
  }, [selectedBuilding, nivel]);

  return (
    <div className="p-5">
      

      {selectedBuilding && (
        <div className="mt-5 p-5 bg-black">
          <h3 className="text-xl font-bold">{selectedBuilding.name}</h3>
          <p>{selectedBuilding.descripcion}</p>
          <p>
            Genera {getResourceAmount(selectedBuilding, nivel)}{" "}
            cada{" "}
            {getIntervalTime(selectedBuilding, nivel) / 1000} segundos
          </p>
          <div className="flex justify-between items-center">
            <p>
              Trabajadores requeridos:{" "}
              {/* {selectedBuilding.trabajadoresRequeridos[nivel - 1]} /{" "}
              {selectedBuilding.trabajadoresRequeridos[nivel - 1]} */}
            </p>
            {nivel < 3 && (
              <Button
                onClick={handleMejorarEdificio}
                text={`Mejorar (Nivel ${nivel + 1})`}
                className="bg-blue-600"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuildingEdif;


// {edificios.map((edificio, index) => (
//   <div
//     key={edificio.id}
//     className="item-text bg-black cursor-pointer hover:bg-opacity-50"
//     onClick={() => handleItemClick(index)}
//   >
//     {/* {`${edificio.name} : ${edificio.descripcion}`} */}
//   </div>
// ))}