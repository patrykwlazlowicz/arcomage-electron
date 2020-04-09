import { Condition } from './condition';
import { PlayerDTO } from '../../dto/player-dto';


export class NoCondition implements Condition {

  static TYPE: string = "NO_CONDITION";

  check(leader: PlayerDTO, opponent: PlayerDTO, conditionProperty: any): boolean {
    return true;
  }
}
