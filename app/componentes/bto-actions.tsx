// acá van a ir todos las acciones de los botones que necesitamos en el juego 
import React from "react";

interface ButtonProps { // serían propiedades del botón
    onClick: () => void;
    text: string;
  
  }
  
  const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
  };
  
  export default Button;
  