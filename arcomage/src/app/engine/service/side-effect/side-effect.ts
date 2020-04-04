import { Player } from '../../model/player';

export interface SideEffect {
    execute(subject: Player, opponent: Player, sideEffectProperty: any);
}
