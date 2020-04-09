import { SideEffect } from './side-effect';
import { PlayerDTO } from '../../dto/player-dto';
import * as _ from 'lodash';

interface SideEffectProperty {
    what: string;
    property: string;
}

export class AlignResources implements SideEffect {

    static TYPE: string = "ALIGN_RESOURCES";

    execute(subject: PlayerDTO, opponentForSubject: PlayerDTO, sideEffectProperty: SideEffectProperty) {
        subject[sideEffectProperty.what][sideEffectProperty.property] = opponentForSubject[sideEffectProperty.what][sideEffectProperty.property];
    }

}