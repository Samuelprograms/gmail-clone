import React from "react";
import "./../css/SidebarOption.css";

const SidebarOption = ({
  Icon,
  name,
  pressed,
  setPressed,
  toggle,
  setToggle,
}) => {
  return (
    <button
      name={name}
      className={`sidebar__button ${
        pressed === name && "sidebar__button--active"
      }`}
      onClick={() => {
        if (setPressed) {
          setPressed(name);
        } else {
          setToggle(!toggle);
        }
      }}
    >
      <Icon />
      <span>{name}</span>
    </button>
  );
};

export default SidebarOption;
