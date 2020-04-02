import { Card } from './card';

export class Player {
    bricksState: number;
    gemsState: number;
    recruitsState: number;
    bricksGrowth: number;
    gemsGrowth: number;
    recruitsGrowth: number;
    towerHeight: number;
    wallHeight: number;
    isMyTurn: boolean;
    cards: Card[];
}
