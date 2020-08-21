import React, { useState } from "react";
import Popular from "../Popular";
import Battle from "../Battle";
import NavButton from "../NavButton";
import "./styles.css";

export default function App() {
  const [showBattle, setShowBattle] = useState(false);

  function toggleView(showBattle) {
    setShowBattle(showBattle);
  }

  return (
    <div className="container">
      <div className="grid space-between">
        <NavButton
          text={"Popular Repositories"}
          onClick={() => toggleView(false)}
        />
        <NavButton
          text={"Github User Battle"}
          onClick={() => toggleView(true)}
        />
      </div>
      {!showBattle && <Popular />}
      {showBattle && <Battle />}
    </div>
  );
}
