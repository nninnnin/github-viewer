/*

  TODO: Enter your own Github client id and secret id below

  1. Visit Github.com
  2. Visit User Settings (https://github.com/settings/profile)
  3. Select "Developer Settings"
  4. Select "Oauth Apps"
  5. Select "New Oauth App"
  6. Enter "http://localhost:8080" for homepage & callback URL
  7. Enter your Client ID and Secret ID below

 */
const GITHUB_CLIENT_ID = "GITHUB_CLIENT_ID";
const GITHUB_SECRET_ID = "GITHUB_SECRET_ID";

/*

  DO NOT MODIFY this file. Use as is.
  이 파일의 내용은 수정하지 마시고, 다른 파일에서 import하여 사용하세요.

 */
const defaultParams = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET_ID}`;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `"${username}"는 존재하지 않는 사용자입니다`;
  }

  return message;
}

async function getProfile(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}${defaultParams}`
  );

  const profile = await res.json();

  if (profile.message) {
    throw new Error(getErrorMsg(profile.message, username));
  }

  return profile;
}

async function getRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos${defaultParams}&per_page=100`
  );

  const repos = await res.json();

  if (repos.message) {
    throw new Error(getErrorMsg(repos.message, username));
  }

  return repos;
}

function getStarCount(repos) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

async function getUserData(player) {
  const profile = await getProfile(player);
  const repos = await getRepos(player);

  return {
    profile,
    score: calculateScore(profile.followers, repos),
  };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

/*

  Use this function to get battle result
  WARNING: DO NOT MODIFY

 */
export async function battle([player1, player2]) {
  const playerOne = getUserData(player1);
  const playerTwo = getUserData(player2);

  return sortPlayers([await playerOne, await playerTwo]);
}

export async function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories${defaultParams}&q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  const res = await fetch(endpoint);
  const { items } = await res.json();

  return items;
}
