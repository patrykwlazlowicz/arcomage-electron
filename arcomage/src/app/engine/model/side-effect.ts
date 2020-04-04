import { Condition } from './condition';

export interface SideEffect {
    condition: Condition;
    type: string;
    effectForOpponent: boolean;
    effectProperty?: any;
}