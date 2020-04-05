import { Injectable } from '@angular/core';
import { NoCondition } from './condition/no-condition';
import { CompareWithOpponentCondition } from './condition/compare-with-opponent-condition';
import { CompareWithValueCondition } from './condition/compare-with-value-condition';
import { Condition } from './condition/condition';
import { Player } from '../model/player';
import { Condition as ConditionModel } from '../model/condition';

@Injectable()
export class ConditionService {

  private conditionsRegister: Map<string, Condition> = new Map<string, Condition>();

  constructor() {
    // TODO refactor
    this.conditionsRegister.set(NoCondition.TYPE, new NoCondition());
    this.conditionsRegister.set(CompareWithOpponentCondition.TYPE, new CompareWithOpponentCondition());
    this.conditionsRegister.set(CompareWithValueCondition.TYPE, new CompareWithValueCondition());
  }

  checkCondition(leader: Player, opponent: Player, conditionModel: ConditionModel): boolean {
    return this.conditionsRegister.get(conditionModel.type).check(leader, opponent, conditionModel.conditionProperty);
  }
}
