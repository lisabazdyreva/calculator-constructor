import {store} from "../store/store";
import {CalculatorElementsName, CalculatorMode, OperatorsValue} from "../const";


export type CalculatorModeType = typeof CalculatorMode[keyof typeof CalculatorMode];
export type CalculatorElementsNameType = typeof CalculatorElementsName[keyof typeof CalculatorElementsName];
export type OperatorType = typeof OperatorsValue[keyof typeof OperatorsValue];



export type AppProcess = {
  calculatorDisplayMode: CalculatorModeType,
};

export type AppCanvas = {
  elementsInCalculator: CalculatorElementsNameType[],
};

export type AppCalculations = {
  firstOperand: string,
  operator: OperatorType,
  secondOperand: string,
  result: string,
  isEqualActive: boolean,
  isFloatFirst: boolean,
  isFloatSecond: boolean,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
