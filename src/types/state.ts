import {store} from "../store/store";

export type AppProcess = {
  calculatorDisplayMode: string,
  isCanvasEmpty: boolean,
  isDraggableInsideCanvas: boolean,
  elementsInCalculator: string[]
};

export type AppCalculations = {
  firstOperand: string,
  operator: string,
  secondOperand: string,
  result: string,
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// TODO поправить значение
