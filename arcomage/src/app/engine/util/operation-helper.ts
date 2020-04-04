import { OPERATION } from '../enum/operation.enum';

export class OperationHelper {
    static Evaluate(lhs: number, rhs: number, operation: OPERATION): boolean {
        switch (operation) {
            case OPERATION.EQUAL: return lhs == rhs;
            case OPERATION.NOT_EQUAL: return lhs != rhs;
            case OPERATION.LESS_THAN: return lhs < rhs;
            case OPERATION.LESS_OR_EQUAL: return lhs <= rhs;
            case OPERATION.GREATER_THAN: return lhs > rhs;
            case OPERATION.GREATER_OR_EQUAL: return lhs >= rhs;
        }
    }
}