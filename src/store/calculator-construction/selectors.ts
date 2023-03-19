import { CalculatorElementsNameType, RootState } from "../../types/state";
import { NameSpace } from "../../const";

export const getCalculatorElements = (
  state: RootState
): CalculatorElementsNameType[] | [] =>
  state[NameSpace.CalculatorConstruction].elementsInCalculator;
