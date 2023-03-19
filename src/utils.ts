import { DIVIDE_NULL_MESSAGE, OperatorsValue } from "./const";
import { OperatorType } from "./types/state";

export const count = (a: number, b: number, operator: OperatorType) => {
  switch (operator) {
    case OperatorsValue.Add: {
      if (a + (b % 1) === 0) {
        return a + b;
      } else {
        return +(a + b).toFixed(8);
      }
    }
    case OperatorsValue.Subtract: {
      if (a - (b % 1) === 0) {
        return a - b;
      } else {
        return +(a - b).toFixed(8);
      }
    }
    case OperatorsValue.Multiply: {
      if ((a * b) % 1 === 0) {
        return a * b;
      } else {
        return +(a * b).toFixed(8);
      }
    }
    case OperatorsValue.Divide: {
      if (b === 0) {
        return DIVIDE_NULL_MESSAGE;
      }

      if ((a / b) % 1 === 0) {
        return a / b;
      } else {
        return +(a / b).toFixed(8);
      }
    }
  }
};
