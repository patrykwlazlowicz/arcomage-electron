import { SideEffect, SideEffectResult } from './side-effect';
import { Player } from '../../model/player';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
    secondWaveDamageWhat: string;
    secondWaveDamageProperty: string;
    value: number;
}

export class Damage implements SideEffect {

    static TYPE: string = "DAMAGE";

    execute(subject: Player, opponentForSubject: Player, sideEffectProperty: SideEffectProperty): SideEffectResult {
        const result: SideEffectResult = {
            subject: _.cloneDeep(subject),
            opponentForSubject: _.cloneDeep(opponentForSubject)
        }
        result.subject[sideEffectProperty.what][sideEffectProperty.property] += sideEffectProperty.value;
        if (result.subject[sideEffectProperty.what][sideEffectProperty.property] < 0) {
            const secondWave: number = result.subject[sideEffectProperty.what][sideEffectProperty.property];
            result.subject[sideEffectProperty.secondWaveDamageWhat][sideEffectProperty.secondWaveDamageProperty] += secondWave;
            result.subject[sideEffectProperty.what][sideEffectProperty.property] = 0;
        }
        return result;
    }

}