import React, { useState } from "react";
import './styles.css';
import { battle } from '../../utils/api.js';
import Card from '../Card';

export default function Battle() {
  const [ foo, setAsync] = useState();
  const [leftRepoName, setLeftRepoName] = useState('');
  const [rightRepoName, setRightRepoName] = useState('');
  const [leftRepo, setLeftRepo] = useState(0);
  const [rightRepo, setRightRepo] = useState(0);
  const [winner, setWinner] = useState('');

  function hasNames() {
    return leftRepoName && rightRepoName;
  }

  function handleClick () {
    console.log(leftRepoName);
    console.log(rightRepoName);

    async function a() {
      const result = await battle([leftRepoName, rightRepoName]);
      console.log(result);

      const winner = result[0];
      const loser = result[1];

      console.log(winner.profile, loser.profile);

      if (winner.profile.login === leftRepoName) {
        // 리액트 라이프사이클 안에 넣어주기 위해 setAsyncError라는 콜백함수 안에 state를 세팅하는 메서드들을 넣어준다.

        // 해결방법 1
        setAsync((state) => {
          setWinner('left');
          setLeftRepo(winner);
          setRightRepo(loser);
        });
        // 해결방법 2 - winner만 onClick으로 바꾸고, useEffect로 이하 로직들을 실행해준다 (켄님 solution)

      } else {
        setTimeout(() => setWinner('right'), 0);

        setLeftRepo(loser);
        setRightRepo(winner);
      }
    }

    a();
  }

  const winnerStyle = {
    border : '3px solid orangered'
  };

  return (
    <>
      <h1 className="center-text">IT'S TIME TO FIGHT</h1>
      <div className="battle-repos-container">
        <div className="battle-repo">
          <Card
            header={winner === 'left' ? '승자' : ''}
            avatar={winner ? leftRepo.profile.avatar_url : 'https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'}
            href='https://www.naver.com'
            name={winner ? leftRepo.profile.name : leftRepoName}
            style={winner === 'left' ? winnerStyle : null}
          >
            <ul className="card-list">
                <li>
                  점수 : {winner ? leftRepo.score : ''}
                </li>
                <li>
                  풀네임 : {winner ? leftRepo.profile.name : ''}
                </li>
                <li>
                  지역 : {winner ? leftRepo.profile.location : ''}
                </li>
                <li>
                  팔로워 : {winner ? leftRepo.profile.follwers : ''}
                </li>
                <li>
                  팔로잉 : {winner ? leftRepo.profile.following : ''}
                </li>
                <li>
                  레포 갯수 : {winner ? leftRepo.profile.public_repos : ''}
                </li>
              </ul>
          </Card>

          <span>
            <input value={leftRepoName} onChange={(e) => {
              setLeftRepoName(e.target.value);
            }} />
          </span>
        </div>
        <div className="battle-repo">
          <Card
            header={winner === 'right' ? '승자' : ''}
            avatar={winner ? rightRepo.profile.avatar_url : 'https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'}
            href='https://www.naver.com'
            name={winner ? rightRepo.profile.name : rightRepoName}
            style={winner === 'right' ? winnerStyle : null}
          >
            <ul className="card-list">
                <li>
                  점수 : {winner ? rightRepo.score : ''}
                </li>
                <li>
                  풀네임 : {winner ? rightRepo.profile.name : ''}
                </li>
                <li>
                  지역 : {winner ? rightRepo.profile.location : ''}
                </li>
                <li>
                  팔로워 : {winner ? rightRepo.profile.follwers : ''}
                </li>
                <li>
                  팔로잉 : {winner ? rightRepo.profile.following : ''}
                </li>
                <li>
                  레포 갯수 : {winner ? rightRepo.profile.public_repos : ''}
                </li>
              </ul>
          </Card>

          <span>
            <input value={rightRepoName} onChange={(e) => {
              setRightRepoName(e.target.value);
              }} />
          </span>
        </div>
      </div>
      {hasNames() && <button className="battle-button" onClick = {handleClick}>FIGHT!</button>}
    </>
  );
}
