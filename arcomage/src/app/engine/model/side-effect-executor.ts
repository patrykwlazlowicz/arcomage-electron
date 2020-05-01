import { ConditionChecker } from './condition-checker';
import { SideEffect } from './side-effect/side-effect';
import { ChangeValue } from './side-effect/change-value';
import { Damage } from './side-effect/damage';
import { AlignResources } from './side-effect/align-resources';
import { SwapResources } from './side-effect/swap-resources';
import { DiscardCard } from './side-effect/discard-card';
import { SideEffectDTO } from '../dto/side-effect-dto';
import { PlayerDTO } from '../dto/player-dto';
import { Steal } from './side-effect/steal';

export class SideEffectExecutor {

  private sideEffectsRegister: Map<string, SideEffect> = new Map<string, SideEffect>();

  constructor() {
    // TODO refactor specific Effect should add itself to register
    this.sideEffectsRegister.set(ChangeValue.TYPE, new ChangeValue());
    this.sideEffectsRegister.set(Damage.TYPE, new Damage());
    this.sideEffectsRegister.set(AlignResources.TYPE, new AlignResources());
    this.sideEffectsRegister.set(SwapResources.TYPE, new SwapResources());
    this.sideEffectsRegister.set(DiscardCard.TYPE, new DiscardCard());
    this.sideEffectsRegister.set(Steal.TYPE, new Steal());
  }

  executeEffect(sideEffectDTO: SideEffectDTO, leader: PlayerDTO, opponent: PlayerDTO): void {
    const subject: PlayerDTO = (sideEffectDTO.effectForOpponent ? opponent : leader);
    const opponentForSubject: PlayerDTO = (sideEffectDTO.effectForOpponent ? leader : opponent);
    this.sideEffectsRegister.get(sideEffectDTO.type).execute(subject, opponentForSubject, sideEffectDTO.effectProperty);
  }
}