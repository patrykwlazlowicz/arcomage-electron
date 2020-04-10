import { Condition } from './condition';
import { PlayerDTO } from '../../dto/player-dto';
import { OperationHelper } from '../../util/operation-helper';
import { Operation } from '../../enum/operation.enum';

interface ConditionProperty {
  conditionForOpponent: boolean;
  what: string;
  property: string;
  operation: Operation;
  value: number;
}

export class CompareWithValueCondition implements Condition {

  static TYPE: string = "COMPARE_WITH_VALUE";

  check(leader: PlayerDTO, opponent: PlayerDTO, conditionProperty: ConditionProperty): boolean {
    const subject: PlayerDTO = conditionProperty.conditionForOpponent ? opponent : leader;
    return OperationHelper.Evaluate(
      subject[conditionProperty.what][conditionProperty.property],
      conditionProperty.value,
      conditionProperty.operation);
  }
}
