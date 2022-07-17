/// <reference lib="webworker" />

import axios from 'axios';
import { environment } from 'src/environments/environment';

function shuffleFisherYates(array: any[]) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function getPlayers(season?: number) {
  const url = `${environment.nhlApi}/players`;

  return axios
    .get(`${url}/all`, { params: { season: season } })
    .then((res: any) => {
      return res.data;
    });
}

function getCurrentSeason() {
  const url = `${environment.nhlApi}/seasons`;

  return axios.get(url).then((res: any) => {
    return res.data;
  });
}

addEventListener('message', ({ data }) => {
  getCurrentSeason()
    .then((res) => {
      const numberOfSeasons = res.length;
      const currentSeason = res[numberOfSeasons - 1];

      return currentSeason;
    })
    .then((currentSeason) => {
      getPlayers(+currentSeason.seasonId).then((players) => {
        const response = shuffleFisherYates(players);
        postMessage(response);
      });
    });
});
