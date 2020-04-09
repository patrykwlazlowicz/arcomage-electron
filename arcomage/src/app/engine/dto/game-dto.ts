import { PlayerDTO } from './player-dto';
import { WaistDTO } from './waist-dto';

export interface GameDTO {
  waist: WaistDTO;
  playerRed: PlayerDTO;
  playerBlue: PlayerDTO;
  towerHeightForWin: number;
}