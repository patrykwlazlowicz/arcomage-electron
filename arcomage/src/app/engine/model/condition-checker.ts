import { Condition } from './condition/condition';
import { NoCondition } from './condition/no-condition';
import { CompareWithOpponentCondition } from './condition/compare-with-opponent-condition';
import { CompareWithValueCondition } from './condition/compare-with-value-condition';
import { PlayerDTO } from '../dto/player-dto';
import { ConditionDTO } from '../dto/condition-dto';

export class ConditionChecker {
    
    private conditionsRegister: Map<string, Condition> = new Map<string, Condition>();
  
    constructor() {
      // TODO refactor
      this.conditionsRegister.set(NoCondition.TYPE, new NoCondition());
      this.conditionsRegister.set(CompareWithOpponentCondition.TYPE, new CompareWithOpponentCondition());
      this.conditionsRegister.set(CompareWithValueCondition.TYPE, new CompareWithValueCondition());
    }

    checkCondition(leader: PlayerDTO, opponent: PlayerDTO, conditionDTO: ConditionDTO): boolean {
      return this.conditionsRegister.get(conditionDTO.type).check(leader, opponent, conditionDTO.conditionProperty);
    }
}
  