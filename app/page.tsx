'use client'
import React, {useEffect, useState} from "react";
import ButtonGrid from "./componentes/bto-base";
import {getRecursoList, type Recurso} from "./service/recursos"
import './Css/pantalla.css'


//---------------------------------------------------------------------
// parte superior recursos y botones desplegables
//---------------------------------------------------------------------
const HorizontalList: React.FC<{ items: Recurso[] }> = ({ items }) => {
  return (
    <div className="horizontal-list-container"> {/* Estilo de Flexbox */}
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
// botones alineados
const ButtonGroup: React.FC<{ buttons: { text: string, onClick: () => void }[] }> = ({ buttons }) => {
  return (
    <div className="button-group-container"> {/* Contenedor para centrar y separar botones */}
      {buttons.map((button, index) => (
        <button
          key={index}
          className="button-item"
          onClick={button.onClick}
        >
          {button.text} {/* Texto del botón */}
        </button>
      ))}
    </div>
  );
};

//---------------------------------------------------------------------
// Componente que muestra el círculo grande y otros círculos pequeños
//---------------------------------------------------------------------
const CircleComponent: React.FC = () => {
  const numberOfCircles = 6; // Número de círculos pequeños
  const radius = 100; // Radio del círculo grande

  // Distribuye los círculos pequeños alrededor del círculo grande
  const circles = Array.from({ length: numberOfCircles }, (_, index) => {
    const angle = (2 * Math.PI * index) / numberOfCircles; // Ángulo para cada círculo
    const x = Math.cos(angle) * radius; // Posición X
    const y = Math.sin(angle) * radius; // Posición Y

    return (
      <div
        key={index}
        className="small-circle"
        style={{ transform: `translate(${x}px, ${y}px)` }} // Posicionar cada círculo
      >
        {/* Aquí puedes poner una imagen o cualquier contenido */}
        {index + 1} {/* Número del círculo */}
      </div>
    );
  });

  return (
    <div className="large-circle"> {/* Gran círculo que contiene los pequeños */}
      {circles} {/* Coloca los círculos pequeños */}
    </div>
  );
};
//botones grnades y pequeños
//---------------------------------------------------------------------


//aca muestra todo
const App: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]); // Estado para la lista
  const [showCircle, setShowCircle] = useState(false); // Estado para mostrar el círculo grande

  useEffect(() => {
    const fetchData = async () => {
      const result = await getRecursoList(); // Obtener datos
      setRecursos(result.list); // Guardar datos en el estado
    };

    fetchData(); // Ejecuta para obtener datos al montar el componente
  }, []); // Efecto se ejecuta una vez

  // Botones que pueden controlar la visibilidad del círculo grande
  const buttons = [
    {
      text: 'Botón 1',
      onClick: () => {
        console.log('Botón 1 clickeado');
        setShowCircle(!showCircle); // Alterna mostrar/ocultar el círculo
      },
    },
    {
      text: 'Botón 2',
      onClick: () => {
        console.log('Botón 2 clickeado');
        setShowCircle(!showCircle); // Alterna mostrar/ocultar el círculo
      },
    },
    {
      text: 'Botón 3',
      onClick: () => {
        console.log('Botón 3 clickeado');
        setShowCircle(!showCircle); // Alterna mostrar/ocultar el círculo
      },
    },
  ];

  return (
    <div>
      <HorizontalList items={recursos} /> {/* Mostrar la lista */}
      <ButtonGroup buttons={buttons} /> {/* Mostrar los botones */}
      {showCircle && <CircleComponent />} {/* Mostrar el círculo grande si está activo */}
    </div>
  );
};
//---------------------------------------------------------------------
//---------------------------------------------------------------------


export default App;