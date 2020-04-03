import { Card } from './card';
import { Player } from './player';

export class Game {
  waist: Card[];
  discardedWaist: Card[] = [];
  playerRed: Player;
  playerBlue: Player;
  towerHeightForWin: number;

  constructor(waist: Card[], playerRed: Player, playerBlue: Player, towerHeightForWin: number) {
    this.waist = waist;
    this.playerRed = playerRed;
    this.playerBlue = playerBlue;
    this.towerHeightForWin = towerHeightForWin;
  }
}