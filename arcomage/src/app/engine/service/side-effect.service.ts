import { Injectable } from '@angular/core';
import { SideEffect } from './side-effect/side-effect';
import { SideEffect as SideEffectModel } from '../model/side-effect';
import { Player } from '../model/player';
import { ConditionService } from './condition.service';
import { ChangeValue } from './side-effect/change-value';
import { Damage } from './side-effect/damage';
import { AlignResources } from './side-effect/align-resources';
import { SwapResources } from './side-effect/swap-resources';
import { DiscardCard } from './side-effect/discard-card';

@Injectable()
export class SideEffectService {

  private sideEffectsRegister: Map<string, SideEffect> = new Map<string, SideEffect>();

  constructor(private conditionService: ConditionService) {
    this.sideEffectsRegister.set(ChangeValue.TYPE, new ChangeValue());
    this.sideEffectsRegister.set(Damage.TYPE, new Damage());
    this.sideEffectsRegister.set(AlignResources.TYPE, new AlignResources());
    this.sideEffectsRegister.set(SwapResources.TYPE, new SwapResources());
    this.sideEffectsRegister.set(DiscardCard.TYPE, new DiscardCard());
  }

  executeEffect(sideEffectModel: SideEffectModel, leader: Player, opponent: Player) {
    if (this.conditionService.checkCondition(leader, opponent, sideEffectModel.condition)) {
      const subject: Player = sideEffectModel.effectForOpponent ? opponent : leader;
      const opponentForSubjecty: Player = sideEffectModel.effectForOpponent ? leader : opponent;
      this.sideEffectsRegister.get(sideEffectModel.type).execute(subject, opponentForSubjecty, sideEffectModel.effectProperty);
    }
  }

}
