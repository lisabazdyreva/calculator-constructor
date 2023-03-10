import {AppProcess} from "../../types/state";
import {createSlice} from "@reduxjs/toolkit";

export const initialStateApp: AppProcess = {
    calculatorDisplayMode: 'edit',
    isCanvasEmpty: true,
    isDraggableInsideCanvas: false,
    elementsInCalculator: [],
};
//{name: ..., isDisplay:... , order: ...}

export const process = createSlice({
    name: 'AppProcess',
    initialState: initialStateApp,
    reducers: {
        setDisplayMode: (state, action) => {
            state.calculatorDisplayMode = action.payload;
        },
        setCanvasViewMode: (state, action) => {
            state.isCanvasEmpty = action.payload;
        },
        setPosition: (state, action) => {
          state.isDraggableInsideCanvas = action.payload;
        },
        setElement: (state, action) => {
          state.elementsInCalculator.push(action.payload);
          state.isCanvasEmpty = false;
        },
        removeElement: (state, action) => {
          state.elementsInCalculator = state.elementsInCalculator.filter((elem) => elem === action.payload);
          if (!state.elementsInCalculator.length) {
            state.isCanvasEmpty = true;
          }
        },
    }
});

export const {setDisplayMode, setCanvasViewMode, setPosition, setElement, removeElement} = process.actions;
