import { ConditionDTO } from './condition-dto';

export interface SideEffectDTO {
    condition: ConditionDTO;
    type: string;
    effectForOpponent: boolean;
    effectProperty?: any;
}