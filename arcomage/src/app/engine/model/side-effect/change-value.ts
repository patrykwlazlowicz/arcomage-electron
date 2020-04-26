import { SideEffect } from './side-effect';
import { PlayerDTO } from '../../dto/player-dto';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
    value: number;
}

export class ChangeValue implements SideEffect {

    static TYPE: string = "CHANGE_VALUE";

    execute(subject: PlayerDTO, opponentForSubject: PlayerDTO, sideEffectProperty: SideEffectProperty): void {
        subject[sideEffectProperty.what][sideEffectProperty.property] += sideEffectProperty.value;
        if (subject[sideEffectProperty.what][sideEffectProperty.property] < 0) {
            subject[sideEffectProperty.what][sideEffectProperty.property] = 0;
        }
    }

}