import { SideEffect } from './side-effect';
import { Player } from '../../model/player';

interface SideEffectProperty {
    what: string;
    property: string;
    secondWaveDamageWhat: string;
    secondWaveDamageProperty: string;
    value: number;
}

export class Damage implements SideEffect {

    static TYPE: string = "DAMAGE";

    execute(subject: Player, opponent: Player, sideEffectProperty: SideEffectProperty) {
        subject[sideEffectProperty.what][sideEffectProperty.property] += sideEffectProperty.value;
        if (subject[sideEffectProperty.what][sideEffectProperty.property] < 0) {
            const secondWave: number = subject[sideEffectProperty.what][sideEffectProperty.property];
            subject[sideEffectProperty.secondWaveDamageWhat][sideEffectProperty.secondWaveDamageProperty] += secondWave;
            subject[sideEffectProperty.what][sideEffectProperty.property] = 0;
        }
    }

}