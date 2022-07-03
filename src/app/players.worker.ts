/// <reference lib="webworker" />

import axios from 'axios';

import { Player } from 'src/app/nhl/interfaces/player.interface';
import { environment } from 'src/environments/environment';

function shuffleFisherYates(array: any[]) {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * i);
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
}

function getPlayers() {
  const url = `${environment.nhlApi}/players`;

  return axios.get(`${url}/all`).then((res: any) => {
    return res.data;
  });
}

addEventListener('message', ({ data }) => {
  getPlayers().then((players) => {
    const response = shuffleFisherYates(players);
    postMessage(response);
  });
});
