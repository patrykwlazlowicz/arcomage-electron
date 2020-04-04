import { SideEffect } from './side-effect';
import { Player } from '../../model/player';

export class DiscardCard implements SideEffect {

    static TYPE: string = "DISCARD_CARD";

    execute(subject: Player, opponent: Player, sideEffectProperty: any) {
        ++subject.haveCardToDiscard;
    }

}