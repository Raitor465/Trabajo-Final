
// Resources.tsx
import React from "react";

interface Recurso {
  id: number;
  name: string;
  cantidad: number;
}

interface Props {
  items: Recurso[];
}

const Resources: React.FC<Props> = ({ items }) => {
  return (
    <div className="horizontal-list-container p-2">
      {items.map((item) => (
        <div key={item.id} className="list-item">
          <span className="item-text">
            {item.name} : {item.cantidad}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Resources;
