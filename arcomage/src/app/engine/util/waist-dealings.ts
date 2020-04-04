import { Card } from '../model/card';

export interface DealCards {
    playerRed: Card[];
    playerBlue: Card[];
    waist: Card[];
}

export interface NextCardFromWaist {
    card: Card;
    waist: Card[];
    discardedWaist: Card[];
}