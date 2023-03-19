import { CalculatorModeType, RootState } from "../../types/state";

import { NameSpace } from "../../const";

export const getCalculatorDisplayMode = (
  state: RootState
): CalculatorModeType => state[NameSpace.App].calculatorDisplayMode;
