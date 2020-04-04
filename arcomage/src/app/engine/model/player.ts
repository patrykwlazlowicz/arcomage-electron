import { Card } from './card';
import { Resources } from './resources';
import { Castle } from './castle';
import { CARD_IDX } from '../enum/card-idx.enum';

export interface Player {
	bricks: Resources;
	gems: Resources;
	recruits: Resources;
	castle: Castle;
	isMyTurn: boolean;
	haveCardToDiscard: number;
	cards: Card[];
}
