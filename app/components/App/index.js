import React, { useState } from "react";
import Popular from "../Popular";
import Battle from "../Battle";
import NavButton from "../NavButton";
import "./styles.css";

export default function App() {
  const [showBattle, setShowBattle] = useState(false);
  const [repos, setRepos] = useState({});
  const [latestBattleResult, setLatestBattleResult] = useState({
    leftRepo: {},
    rightRepo: {}
  });

  function toggleView(showBattle) {
    setShowBattle(showBattle);
  }

  return (
    <div className="container">
      <div className="grid space-between">
        <NavButton
          isActive={!showBattle}
          text={"인기있는 저장소"}
          onClick={() => toggleView(false)}
        />
        <NavButton
          isActive={showBattle}
          text={"Github 배틀"}
          onClick={() => toggleView(true)}
        />
      </div>
      {!showBattle && <Popular repos={repos} updateRepos={(repo) => setRepos(repo)} />}
      {showBattle && <Battle storeResult={setLatestBattleResult} latestBattle={latestBattleResult} />}
    </div>
  );
}
