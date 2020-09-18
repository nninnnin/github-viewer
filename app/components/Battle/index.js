import React, { useState, useEffect } from "react";
import './styles.css';
import { battle } from '../../utils/api.js';
import Card from '../Card';
import Loading from '../Loading'

export default function Battle({ storeResult, latestBattle }) {
  const [leftRepoName, setLeftRepoName] = useState('');
  const [rightRepoName, setRightRepoName] = useState('');
  const [leftRepo, setLeftRepo] = useState(latestBattle.leftRepo);
  const [rightRepo, setRightRepo] = useState(latestBattle.rightRepo);
  const [isBattleReady, setIsBattleReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeftWinner, setIsLeftWinner] = useState(false);
  const [isBattleOver, setIsBattleOver] = useState(false);

  const reposReady = leftRepo.profile && rightRepo.profile;

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
        } else {
          setIsLeftWinner(false);
          setLeftRepo(loser);
          setRightRepo(winner);
        }

        setIsBattleOver(true);
        setIsLoading(false);
      } catch (err) {
        console.log(`Error occured during battle sequence ${err}`);
      }
    })();

  }, [isBattleReady]);

  useEffect(() => {
    if (reposReady) {
      storeResult({
        leftRepo,
        rightRepo,
        isLeftWinner
      });
    }
  }, [isBattleOver]);

  function hasNames() {
    return leftRepoName && rightRepoName;
  }

  function handleClick () {
    setIsBattleReady(true);
  }

  const winnerStyle = {
    border : '3px solid orangered'
  };

  return (
    <>
      <h1 className="center-text">IT'S TIME TO FIGHT</h1>
      {
        !isLoading
        &&
        <div className="battle-repos-container">
          <div className="battle-repo">
            <Card
              header={reposReady && isLeftWinner ? <img className="prize" src="app/components/Battle/asset/award.png"/> : ''}
              avatar={reposReady ? leftRepo.profile.avatar_url : 'https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'}
              href={reposReady ? `https://github.com/${leftRepoName}` : null}
              name={reposReady ? leftRepo.profile.name : leftRepoName}
              style={reposReady === 'left' ? winnerStyle : null}
            >
              {
                reposReady
                &&
                <ul className="card-list">
                  <li className="score">
                    점수 : {reposReady ? leftRepo.score : ''}
                  </li>

                  <br></br>

                  <li>
                    Username : {reposReady ? leftRepoName : ''}
                  </li>
                  <li>
                    지역 : {reposReady ? leftRepo.profile.location : ''}
                  </li>
                  <li>
                    팔로워 : {reposReady ? leftRepo.profile.follwers : ''}
                  </li>
                  <li>
                    팔로잉 : {reposReady ? leftRepo.profile.following : ''}
                  </li>
                  <li>
                    레포 갯수 : {reposReady ? leftRepo.profile.public_repos : ''}
                  </li>
                </ul>
              }
            </Card>

            <span>
              <input value={leftRepoName} onChange={(e) => {
                setLeftRepoName(e.target.value);
              }} />
            </span>
          </div>
          <div className="battle-repo">
            <Card
              header={reposReady && !isLeftWinner ? <img className="prize" src="app/components/Battle/asset/award.png"/> : ''}
              avatar={reposReady ? rightRepo.profile.avatar_url : 'https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'}
              href={reposReady ? `https://github.com/${rightRepoName}` : null}
              name={reposReady ? rightRepo.profile.name : rightRepoName}
              style={reposReady === 'right' ? winnerStyle : null}
            >
              {
                reposReady
                &&
                <ul className="card-list">
                  <li className="score">
                    점수 : {reposReady ? rightRepo.score : ''}
                  </li>

                  <br></br>

                  <li>
                    Username : {reposReady ? rightRepoName : ''}
                  </li>
                  <li>
                    지역 : {reposReady ? rightRepo.profile.location : ''}
                  </li>
                  <li>
                    팔로워 : {reposReady ? rightRepo.profile.followers : ''}
                  </li>
                  <li>
                    팔로잉 : {reposReady ? rightRepo.profile.following : ''}
                  </li>
                  <li>
                    레포 갯수 : {reposReady ? rightRepo.profile.public_repos : ''}
                  </li>
                </ul>
              }
            </Card>

            <span>
              <input value={rightRepoName} onChange={(e) => {
                setRightRepoName(e.target.value);
                }} />
            </span>
          </div>
        </div>
      }

      {
        (hasNames() && !reposReady)
        &&
        <button className="battle-button" onClick = {handleClick}>FIGHT!</button>
      }

      {isLoading && <Loading/>}
    </>
  );
}
