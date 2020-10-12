import React from "react";
import Card from '../Card';

export default function Fighter({ repo, repoName, updateRepoName, victory }) {
  const isRepoFetched = repo.hasOwnProperty("profile");
  const winnerStyle = {
    border : '3px solid orangered'
  };
  return (
    <>
      <Card
        header={isRepoFetched && victory ? <img className="prize" src="app/asset/award.png"/> : ''}
        avatar={isRepoFetched ? repo.profile.avatar_url : 'https://live.staticflickr.com/4057/4397720327_a0680cf86d_z.jpg'}
        href={isRepoFetched ? `https://github.com/${repoName}` : null}
        name={isRepoFetched ? repo.profile.name : repoName}
        style={victory ? winnerStyle : null}
      >
        {isRepoFetched && (
          <ul className="card-list">
            <li className="score">
            점수 : {repo.score}
            </li>

            <br></br>

            <li>
            Username : {repoName}
            </li>
            <li>
            지역 : {repo.profile.location}
            </li>
            <li>
            팔로워 : {repo.profile.followers}
            </li>
            <li>
            팔로잉 : {repo.profile.following}
            </li>
            <li>
            레포 갯수 : {repo.profile.public_repos}
            </li>
          </ul>
        )}
      </Card>

      <span>
        <input value={repoName} onChange={(e) => {
          updateRepoName(e.target.value);
          }} />
      </span>
    </>
  )
}
