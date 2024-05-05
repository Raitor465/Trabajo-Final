'use client'
import React from "react";
import ButtonGrid from "./componentes/bto-base";

const HomePage: React.FC = () => {
  const buttons = [
    { text: "Botón 1", onClick: () => console.log("Botón 1 clickeado") },
    { text: "Botón 2", onClick: () => console.log("Botón 2 clickeado") },
    { text: "Botón 3", onClick: () => console.log("Botón 3 clickeado") },
  ];

  return (
    <div>
      <ButtonGrid buttons={buttons} />
    </div>
  );
};

export default HomePage;