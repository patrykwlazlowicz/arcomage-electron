import { SideEffect } from './side-effect';
import { Player } from '../../model/player';

interface SideEffectProperty {
    what: string;
    property: string;
}

export class AlignResources implements SideEffect {

    static TYPE: string = "ALIGN_RESOURCES";

    execute(subject: Player, opponent: Player, sideEffectProperty: SideEffectProperty) {
        subject[sideEffectProperty.what][sideEffectProperty.property] = opponent[sideEffectProperty.what][sideEffectProperty.property];
    }

}