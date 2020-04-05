import { SideEffect, SideEffectResult } from './side-effect';
import { Player } from '../../model/player';
import * as _ from 'lodash';

export class DiscardCard implements SideEffect {

    static TYPE: string = "DISCARD_CARD";

    execute(subject: Player, opponentForSubject: Player, sideEffectProperty: any): SideEffectResult {
        const result: SideEffectResult = {
            subject: _.cloneDeep(subject),
            opponentForSubject: _.cloneDeep(opponentForSubject)
        }
        ++result.subject.haveCardToDiscard;
        return result;
    }

}