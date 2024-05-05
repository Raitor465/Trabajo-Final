import React from "react";

interface ButtonProps {
  onClick: () => void; // Acción al hacer clic
  text: string; // Texto a mostrar en el botón
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;

