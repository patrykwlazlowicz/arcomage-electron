import { Condition } from './condition';
import { Player } from '../../model/player';


export class NoCondition implements Condition {

  static TYPE: string = "NO_CONDITION";

  check(leader: Player, opponent: Player, conditionProperty: any): boolean {
    return true;
  }
}
