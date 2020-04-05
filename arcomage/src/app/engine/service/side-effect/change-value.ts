import { SideEffect, SideEffectResult } from './side-effect';
import { Player } from '../../model/player';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
    value: number;
}

export class ChangeValue implements SideEffect {

    static TYPE: string = "CHANGE_VALUE";

    execute(subject: Player, opponentForSubject: Player, sideEffectProperty: SideEffectProperty): SideEffectResult {
        const result: SideEffectResult = {
            subject: _.cloneDeep(subject),
            opponentForSubject: _.cloneDeep(opponentForSubject)
        }
        result.subject[sideEffectProperty.what][sideEffectProperty.property] += sideEffectProperty.value;
        if (result.subject[sideEffectProperty.what][sideEffectProperty.property] < 0) {
            result.subject[sideEffectProperty.what][sideEffectProperty.property] = 0;
        }
        return result;
    }

}