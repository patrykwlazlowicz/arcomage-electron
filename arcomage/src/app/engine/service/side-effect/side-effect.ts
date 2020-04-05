import { Player } from '../../model/player';

export interface SideEffectResult {
    subject: Player;
    opponentForSubject: Player;
}

export interface SideEffect {
    execute(subject: Player, opponent: Player, sideEffectProperty: any): SideEffectResult;
}
