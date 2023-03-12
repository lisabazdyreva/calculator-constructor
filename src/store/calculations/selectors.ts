import {RootState} from "../../types/state";
import {NameSpace} from "../../const";

export const getOperator = (state: RootState): string => state[NameSpace.Calculator].operator;
export const getDisplay = (state: RootState): string => state[NameSpace.Calculator].result;
