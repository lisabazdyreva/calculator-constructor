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
      if (action.payload === CalculatorElementsName.Display) {
        state.elementsInCalculator.unshift(action.payload);
        return;
      }
      state.elementsInCalculator.push(action.payload);
    },
    setElementById: (state, action) => {
      let index = state.elementsInCalculator.indexOf(action.payload.place);

      if (action.payload.place === CalculatorElementsName.Display) {
        index += 1;
      }
      state.elementsInCalculator = [...state.elementsInCalculator.slice(0, index), action.payload.element, ...state.elementsInCalculator.slice(index)];
    },
    removeElement: (state, action) => {
      state.elementsInCalculator = state.elementsInCalculator.filter((element) => element !== action.payload);
    },
    replaceElement: (state, action) => {
      let indexReplaced = state.elementsInCalculator.indexOf(action.payload.elementToReplaceId);

      if (action.payload.elementToReplaceId === CalculatorElementsName.Display) {
        indexReplaced += 1;
      }

      const filtered = state.elementsInCalculator.filter((elem) => elem !== action.payload.activeElementId);

      state.elementsInCalculator = [...filtered.slice(0, indexReplaced), action.payload.activeElementId, ...filtered.slice(indexReplaced)];
    }, // todo поменять здесь названия в экшн пэйлоад
  },
});

export const {setElement, setElementById, removeElement, replaceElement} = canvas.actions;
