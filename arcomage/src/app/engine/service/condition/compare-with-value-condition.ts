import { Condition } from './condition';
import { Player } from '../../model/player';
import { OperationHelper } from '../../util/operation-helper';
import { OPERATION } from '../../enum/operation.enum';

interface ConditionProperty {
  conditionForOpponent: boolean;
  what: string;
  property: string;
  operation: OPERATION;
  value: number;
}

export class CompareWithValueCondition implements Condition {

  static TYPE: string = "COMPARE_WITH_VALUE";

  check(leader: Player, opponent: Player, conditionProperty: ConditionProperty): boolean {
    const subject: Player = conditionProperty.conditionForOpponent ? opponent : leader;
    return OperationHelper.Evaluate(
      subject[conditionProperty.what][conditionProperty.property],
      conditionProperty.value,
      conditionProperty.operation);
  }
}
