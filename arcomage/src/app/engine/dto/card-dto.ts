import { SideEffectDTO } from './side-effect-dto';

interface Price {
    bricks: number;
    gems: number;
    recruits: number;
}

export interface CardDTO {
    name: string;
    priorityForAI: number;
    price: Price;
    playAgain: boolean;
    canDiscard: boolean;
    sideEffects: SideEffectDTO[];
}
