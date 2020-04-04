import { Player } from '../../model/player';

export interface Condition {
    check(leader: Player, opponent: Player, conditionProperty: any): boolean;
}
