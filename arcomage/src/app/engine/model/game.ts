import { Card } from './card';
import { Player } from './player';

export interface Game {
  waist: Card[];
  discardedWaist: Card[];
  playerRed: Player;
  playerBlue: Player;
  towerHeightForWin: number;
}