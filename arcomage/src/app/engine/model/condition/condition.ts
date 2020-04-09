import { PlayerDTO } from '../../dto/player-dto';

export interface Condition {
    check(leader: PlayerDTO, opponent: PlayerDTO, conditionProperty: any): boolean;
}
