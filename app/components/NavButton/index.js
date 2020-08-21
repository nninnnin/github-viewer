import React from "react";

export default function NavButton({ text, onClick }) {
  return (
    <a
      className="link"
      onClick={(ev) => {
        ev.preventDefault();
        onClick();
      }}
    >
      {text}
    </a>
  );
}
