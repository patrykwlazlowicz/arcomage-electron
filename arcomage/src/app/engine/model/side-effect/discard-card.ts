import { SideEffect, SideEffectResult } from './side-effect';
import { PlayerDTO } from '../../dto/player-dto';
import * as _ from 'lodash';

export class DiscardCard implements SideEffect {

    static TYPE: string = "DISCARD_CARD";

    execute(subject: PlayerDTO, opponentForSubject: PlayerDTO, sideEffectProperty: any): SideEffectResult {
        const result: SideEffectResult = {
            subject: _.cloneDeep(subject),
            opponentForSubject: _.cloneDeep(opponentForSubject)
        }
        ++result.subject.haveCardToDiscard;
        return result;
    }

}