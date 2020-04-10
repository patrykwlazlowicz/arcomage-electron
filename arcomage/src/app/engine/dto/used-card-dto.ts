import { UsedBySide } from '../enum/used-by-side.enum';
import { UsedAction } from '../enum/used-action.enum';
import { CardDTO } from './card-dto';

export class UsedCardDTO {
    usedBySide: UsedBySide;
    usedAction: UsedAction;
    card: CardDTO;
}