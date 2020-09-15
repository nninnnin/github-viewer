import React, { useState } from "react";
import './styles.css';
import { battle } from '../../utils/api.js';
import Card from '../Card';

export default function Battle() {
  const [leftRepoName, setLeftRepoName] = useState('');
  const [rightRepoName, setRightRepoName] = useState('');
  const [leftRepo, setLeftRepo] = useState({});
  const [rightRepo, setRightRepo] = useState({});
  const [isPrepared, setIsPrepared] = useState(false);

  function hasNames() {
    return leftRepoName && rightRepoName;
  }

function handleClick () {
    battle();
  }
console.log("isPrepared ", isPrepared);
  return (
    <>
      <h1 className="center-text">IT'S TIME TO FIGHT</h1>
      <div className="battleReposContainer">
        <div className="battleRepo">
          <Card
            header='헤더'
            avatar='https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'
            href='https://www.naver.com'
            name='이름'
          />

          <span>
            <input value={leftRepoName} onChange={(e) => {
              setLeftRepoName(e.target.value);
              console.log('yes');
              handleChange();
            }} />
          </span>
        </div>
        <div className="battleRepo">
          <Card
            header='헤더'
            avatar='https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'
            href='https://www.naver.com'
            name='이름'
            />

          <span>
            <input value={rightRepoName} onChange={(e) => {
              setRightRepoName(e.target.value);
              handleChange();
              }} />
          </span>
        </div>
      </div>
      {hasNames() && <button className="battleButton" onClick = {handleClick}>FIGHT!</button>}
    </>
  );
}
