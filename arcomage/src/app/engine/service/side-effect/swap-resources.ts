import { SideEffect } from './side-effect';
import { Player } from '../../model/player';

interface SideEffectProperty {
    what: string;
    property: string;
}

export class SwapResources implements SideEffect {

    static TYPE: string = "SWAP_RESOURCES";

    execute(subject: Player, opponent: Player, sideEffectProperty: SideEffectProperty) {
        const swapTemp: number = subject[sideEffectProperty.what][sideEffectProperty.property];
        subject[sideEffectProperty.what][sideEffectProperty.property] = opponent[sideEffectProperty.what][sideEffectProperty.property];
        opponent[sideEffectProperty.what][sideEffectProperty.property] = swapTemp;
    }

}