import { SideEffect, SideEffectResult } from './side-effect';
import { Player } from '../../model/player';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
}

export class SwapResources implements SideEffect {

    static TYPE: string = "SWAP_RESOURCES";

    execute(subject: Player, opponentForSubject: Player, sideEffectProperty: SideEffectProperty): SideEffectResult {
        const result: SideEffectResult = {
            subject: _.cloneDeep(subject),
            opponentForSubject: _.cloneDeep(opponentForSubject)
        }
        const swapTemp: number = result.subject[sideEffectProperty.what][sideEffectProperty.property];
        result.subject[sideEffectProperty.what][sideEffectProperty.property] = result.opponentForSubject[sideEffectProperty.what][sideEffectProperty.property];
        result.opponentForSubject[sideEffectProperty.what][sideEffectProperty.property] = swapTemp;
        return result;
    }

}