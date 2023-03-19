import {createSlice} from "@reduxjs/toolkit";

import {AppCanvas} from "../../types/state";
import {CalculatorElementsName, NameSpace} from "../../const";

export const initialStateCanvas: AppCanvas = {
  elementsInCalculator: [],
};

export const canvas = createSlice({
  name: NameSpace.Canvas,
  initialState: initialStateCanvas,
  reducers: {
    setElement: (state, action) => {

      if (action.payload.element === CalculatorElementsName.Display) {
        state.elementsInCalculator.unshift(action.payload.element);
        return;
      }

      if (action.payload.place) {
        const index = state.elementsInCalculator.indexOf(action.payload.place);
        state.elementsInCalculator = [...state.elementsInCalculator.slice(0, index), action.payload.element, ...state.elementsInCalculator.slice(index)];
        return;
      } else {
        state.elementsInCalculator.push(action.payload.element);
      }
    },
    removeElement: (state, action) => {
      state.elementsInCalculator = state.elementsInCalculator.filter((element) => element !== action.payload);
    },
    replaceElement: (state, action) => {
      const indexReplaced = state.elementsInCalculator.indexOf(action.payload.elementToReplaceId);
      const filtered = state.elementsInCalculator.filter((elem) => elem !== action.payload.activeElementId);

      state.elementsInCalculator = [...filtered.slice(0, indexReplaced), action.payload.activeElementId, ...filtered.slice(indexReplaced)];
    },
  },
});

export const {setElement, removeElement, replaceElement} = canvas.actions;
