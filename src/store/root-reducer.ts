import {combineReducers} from "@reduxjs/toolkit";

import {NameSpace} from "../const";

import {process} from "./process/process";
import {calculations} from './calculations/calculations';
import {canvas} from "./canvas/canvas";


export const rootReducer = combineReducers({
    [NameSpace.App]: process.reducer,
    [NameSpace.Canvas]: canvas.reducer,
    [NameSpace.Calculator]: calculations.reducer,
});


