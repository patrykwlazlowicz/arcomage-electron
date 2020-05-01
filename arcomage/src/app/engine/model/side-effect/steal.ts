import { SideEffect } from './side-effect';
import { PlayerDTO } from '../../dto/player-dto';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
    value: number;
    stealRatio: number;
}

export class Steal implements SideEffect {

    static TYPE: string = "STEAL";

    execute(subject: PlayerDTO, opponentForSubject: PlayerDTO, sideEffectProperty: SideEffectProperty): void {
        let theftIncome = sideEffectProperty.value;
        subject[sideEffectProperty.what][sideEffectProperty.property] -= sideEffectProperty.value;
        if (subject[sideEffectProperty.what][sideEffectProperty.property] < 0) {
            theftIncome += subject[sideEffectProperty.what][sideEffectProperty.property];
            subject[sideEffectProperty.what][sideEffectProperty.property] = 0;
        }
        theftIncome = Math.ceil(theftIncome / 2);
        opponentForSubject[sideEffectProperty.what][sideEffectProperty.property] += theftIncome;
    }

}