import {combineReducers} from "@reduxjs/toolkit";

import {process} from "./process/process";
import {calculations} from './calculations/calculations';

export const rootReducer = combineReducers({
    AppProcess: process.reducer,
    AppCalculations: calculations.reducer
});
