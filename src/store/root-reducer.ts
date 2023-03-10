import {combineReducers} from "@reduxjs/toolkit";

import {process} from "./process/process";

export const rootReducer = combineReducers({
    AppProcess: process.reducer,
});