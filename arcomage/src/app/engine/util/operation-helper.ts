import { Operation } from '../enum/operation.enum';

export class OperationHelper {
    static Evaluate(lhs: number, rhs: number, operation: Operation): boolean {
        switch (operation) {
            case Operation.EQUAL: return lhs == rhs;
            case Operation.NOT_EQUAL: return lhs != rhs;
            case Operation.LESS_THAN: return lhs < rhs;
            case Operation.LESS_OR_EQUAL: return lhs <= rhs;
            case Operation.GREATER_THAN: return lhs > rhs;
            case Operation.GREATER_OR_EQUAL: return lhs >= rhs;
        }
    }
}