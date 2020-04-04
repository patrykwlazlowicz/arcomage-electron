import { SideEffect } from './side-effect';
import { Player } from '../../model/player';

interface SideEffectProperty {
    what: string;
    property: string;
    value: number;
}

export class ChangeValue implements SideEffect {

    static TYPE: string = "CHANGE_VALUE";

    execute(subject: Player, opponent: Player, sideEffectProperty: SideEffectProperty) {
        subject[sideEffectProperty.what][sideEffectProperty.property] += sideEffectProperty.value;
        if (subject[sideEffectProperty.what][sideEffectProperty.property] < 0) {
            subject[sideEffectProperty.what][sideEffectProperty.property] = 0;
        }
    }

}