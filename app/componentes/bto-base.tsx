import React from "react";
import Button from "./bto-emptyground"; // Asegúrate de importar el componente correcto

interface ButtonGridProps {
  buttons: { text: string; onClick: () => void }[];
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ buttons }) => {
  return (
    <div style={{ display: "flex" }}>
      {buttons.map((button, index) => (
        <Button key={index} onClick={button.onClick} text={button.text} />
      ))}
    </div>
  );
};

export default ButtonGrid;
