import { PlayerDTO } from './player-dto';
import { WaistDTO } from './waist-dto';
import { UsedCardDTO } from './used-card-dto';

export interface GameDTO {
  waist: WaistDTO;
  playerRed: PlayerDTO;
  playerBlue: PlayerDTO;
  towerHeightForWin: number;
  lastUsedCards: UsedCardDTO[];
}