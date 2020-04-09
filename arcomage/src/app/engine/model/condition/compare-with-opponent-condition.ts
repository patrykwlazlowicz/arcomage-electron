import { Condition } from './condition';
import { PlayerDTO } from '../../dto/player-dto';
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

  check(leader: PlayerDTO, opponent: PlayerDTO, conditionProperty: ConditionProperty): boolean {
    return OperationHelper.Evaluate(
      leader[conditionProperty.what][conditionProperty.property],
      opponent[conditionProperty.opponentWhat][conditionProperty.opponentProperty],
      conditionProperty.operation);
  }
}
