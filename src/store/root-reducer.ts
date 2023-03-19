import { combineReducers } from "@reduxjs/toolkit";

import { NameSpace } from "../const";

import { process } from "./process/process";
import { calculations } from "./calculations/calculations";
import { calculatorConstruction } from "./calculator-construction/calculator-construction";

export const rootReducer = combineReducers({
  [NameSpace.App]: process.reducer,
  [NameSpace.CalculatorConstruction]: calculatorConstruction.reducer,
  [NameSpace.Calculator]: calculations.reducer,
});
