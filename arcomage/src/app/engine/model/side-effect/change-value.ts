import { SideEffect, SideEffectResult } from './side-effect';
import { PlayerDTO } from '../../dto/player-dto';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
    value: number;
}

export class ChangeValue implements SideEffect {

    static TYPE: string = "CHANGE_VALUE";

    execute(subject: PlayerDTO, opponentForSubject: PlayerDTO, sideEffectProperty: SideEffectProperty): SideEffectResult {
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