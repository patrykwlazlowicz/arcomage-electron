import { PlayerDTO } from '../../dto/player-dto';

export interface SideEffectResult {
    subject: PlayerDTO;
    opponentForSubject: PlayerDTO;
}

export interface SideEffect {
    execute(subject: PlayerDTO, opponent: PlayerDTO, sideEffectProperty: any): SideEffectResult;
}
