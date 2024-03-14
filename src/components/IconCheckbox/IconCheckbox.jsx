import { useState } from "react";
import {
  RiCheckboxCircleLine,
  RiCheckboxBlankCircleLine,
} from "react-icons/ri";
import "./IconCheckbox.css"; // Archivo CSS para estilos

const IconCheckbox = ({ icons, onSelect }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    onSelect(icon);
  };

  return (
    <div className="icon-checkbox-container">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`icon-checkbox ${selectedIcon === icon ? "selected" : ""}`}
          onClick={() => handleIconClick(icon)}
        >
          {selectedIcon === icon ? (
            <RiCheckboxCircleLine className="icon" />
          ) : (
            <RiCheckboxBlankCircleLine className="icon" />
          )}
          <div className="icon-wrapper">{icon}</div>
        </div>
      ))}
    </div>
  );
};

export default IconCheckbox;
