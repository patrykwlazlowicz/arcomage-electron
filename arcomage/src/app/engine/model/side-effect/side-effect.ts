import { PlayerDTO } from '../../dto/player-dto';

export interface SideEffect {
    execute(subject: PlayerDTO, opponent: PlayerDTO, sideEffectProperty: any);
}
