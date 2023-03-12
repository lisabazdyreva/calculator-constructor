import {DIVIDE_NULL_MESSAGE, OperatorsValue} from "./const";
import {OperatorType} from "./types/state";

export const count = (a: number, b: number, operator: OperatorType) => {
  switch (operator) {
    case OperatorsValue.Add: {
      return a + b;
    }
    case OperatorsValue.Subtract: {
      return a - b;
    }
    case OperatorsValue.Multiply: {
      return a * b;
    }
    case OperatorsValue.Divide: {
      if (b === 0) {
        return DIVIDE_NULL_MESSAGE;
      }

      if (a / b % 1 === 0) {
        return a / b;
      } else {
        return +(a / b).toFixed(8);
      }
    }
  }
};
