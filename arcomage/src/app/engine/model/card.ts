import { SideEffect } from './side-effect';

interface Price {
    bricks: number;
    gems: number;
    recruits: number;
}

export interface Card {
    name: string;
    priorityForAI: number;
    price: Price;
    turnAgain: boolean;
    canDiscard: boolean;
    sideEffects: SideEffect[];
}
