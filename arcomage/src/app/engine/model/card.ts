import { Resources } from './resources';

export class Card {
    name: string;
    priorityForAI: number;
    price: Resources;
    turnAgain: boolean;
    canDiscard: boolean;
    ssideEffects: any[];
}
