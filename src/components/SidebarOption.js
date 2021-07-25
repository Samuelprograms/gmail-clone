import React from "react";
import "./../css/SidebarOption.css";

const SidebarOption = ({ Icon, name, pressed, setPressed }) => {
  return (
    <button
      name={name}
      className={`sidebar__button ${
        pressed === name && "sidebar__button--active"
      }`}
      onClick={(e) => {
        setPressed(name);
      }}
    >
      <Icon />
      <span>{name}</span>
    </button>
  );
};

export default SidebarOption;
