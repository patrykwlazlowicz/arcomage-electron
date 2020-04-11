import { GameSide } from '../enum/game-side.enum';
import { GameAction } from '../enum/game-action.enum';
import { CardDTO } from './card-dto';

export class UsedCardDTO {
    usedBySide: GameSide;
    usedAction: GameAction;
    card: CardDTO;
}