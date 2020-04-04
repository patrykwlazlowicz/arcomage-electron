import { Condition } from './condition';
import { Player } from '../../model/player';
import { OperationHelper } from '../../util/operation-helper';
import { OPERATION } from '../../enum/operation.enum';

interface ConditionProperty {
  what: string;
  property: string;
  opponentWhat: string;
  opponentProperty: string;
  operation: OPERATION;
}

export class CompareWithOpponentCondition implements Condition {

  static TYPE: string = "COMPARE_WITH_OPPONENT";

  check(leader: Player, opponent: Player, conditionProperty: ConditionProperty): boolean {
    return OperationHelper.Evaluate(
      leader[conditionProperty.what][conditionProperty.property],
      opponent[conditionProperty.opponentWhat][conditionProperty.opponentProperty],
      conditionProperty.operation);
  }
}
