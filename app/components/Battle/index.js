import React, { useState, useEffect } from "react";
import { battle } from '../../utils/api.js';
import Fighter from '../Fighter';
import Loading from '../Loading';
import './styles.css';

export default function Battle({ storeResult, latestBattle }) {
  const [leftRepoName, setLeftRepoName] = useState('');
  const [rightRepoName, setRightRepoName] = useState('');
  const [leftRepo, setLeftRepo] = useState(latestBattle.leftRepo);
  const [rightRepo, setRightRepo] = useState(latestBattle.rightRepo);
  const [isBattleReady, setIsBattleReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftWinner, setIsLeftWinner] = useState(latestBattle.isLeftWinner);

  useEffect(() => {
    if (!leftRepoName) return;

    setIsLoading(true);

    (async function () {
      try {
        const result = await battle([ leftRepoName, rightRepoName ]);
        const winner = result[0];
        const loser = result[1];

        if (winner.profile.login === leftRepoName) {
          setIsLeftWinner(true);
          setLeftRepo(winner);
          setRightRepo(loser);
          storeResult({
            leftRepo: winner,
            rightRepo: loser,
            isLeftWinner: true
          });
        } else {
          setIsLeftWinner(false);
          setLeftRepo(loser);
          setRightRepo(winner);
          storeResult({
            leftRepo: loser,
            rightRepo: winner,
            isLeftWinner: false
          });
        }

        setIsLoading(false);
      } catch (err) {
        console.log(`Error occured during battle sequence ${err}`);
      }
    })();

  }, [isBattleReady]);

  function hasNames() {
    return leftRepoName && rightRepoName;
  }

  function handleClick () {
    setIsBattleReady(true);
  }

  return (
    <>
      <h1 className="center-text">IT'S TIME TO FIGHT</h1>
      {isLoading && <Loading/>}

      {!isLoading && (
        <div className="battle-repos-container">
          <div className="battle-repo">
            <Fighter
              repo={leftRepo}
              repoName={leftRepoName}
              updateRepoName={(v) => setLeftRepoName(v)}
              victory={isLeftWinner}>
            </Fighter>
          </div>

          <div className="battle-repo">
            <Fighter
              repo={rightRepo}
              repoName={rightRepoName}
              updateRepoName={(v) => setRightRepoName(v)}
              victory={!isLeftWinner}>
            </Fighter>
          </div>
        </div>
      )}

      {(hasNames() && !isBattleReady ) &&
        <button className="battle-button" onClick={handleClick}>FIGHT!</button>
      }
    </>
  );
}
