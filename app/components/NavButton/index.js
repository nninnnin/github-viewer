import React from "react";
import "./styles.css";

export default function NavButton({ text, isActive, onClick }) {
  return (
    <a
      className={`nav-button ${isActive ? "active" : ""}`}
      onClick={(ev) => {
        ev.preventDefault();
        onClick();
      }}
    >
      {text}
    </a>
  );
}
