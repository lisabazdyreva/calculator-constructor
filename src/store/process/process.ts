import { createSlice } from "@reduxjs/toolkit";

import { AppProcess } from "../../types/state";
import { CalculatorMode, NameSpace } from "../../const";

export const initialStateApp: AppProcess = {
  calculatorDisplayMode: CalculatorMode.Edit,
};

export const process = createSlice({
  name: NameSpace.App,
  initialState: initialStateApp,
  reducers: {
    setCalculatorDisplayMode: (state, action) => {
      state.calculatorDisplayMode = action.payload;
    },
  },
});

export const { setCalculatorDisplayMode } = process.actions;
