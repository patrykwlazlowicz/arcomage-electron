import { SideEffect } from './side-effect';
import { PlayerDTO } from '../../dto/player-dto';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
}

export class SwapResources implements SideEffect {

    static TYPE: string = "SWAP_RESOURCES";

    execute(subject: PlayerDTO, opponentForSubject: PlayerDTO, sideEffectProperty: SideEffectProperty) {
        const swapTemp: number = subject[sideEffectProperty.what][sideEffectProperty.property];
        subject[sideEffectProperty.what][sideEffectProperty.property] = opponentForSubject[sideEffectProperty.what][sideEffectProperty.property];
        opponentForSubject[sideEffectProperty.what][sideEffectProperty.property] = swapTemp;
    }

}