import { PlayerDTO } from './player-dto';
import { WaistDTO } from './waist-dto';
import { UsedCardDTO } from './used-card-dto';
import { GameState } from '../enum/game-state.enum';
import { GameSide } from '../enum/game-side.enum';

export interface GameDTO {
  waist: WaistDTO;
  playerRed: PlayerDTO;
  playerBlue: PlayerDTO;
  towerHeightForWin: number;
  lastUsedCards: UsedCardDTO[];
  gameState: GameState;
  whoWin?: GameSide;
}