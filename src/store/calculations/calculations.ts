import {createSlice} from '@reduxjs/toolkit';

import {AppCalculations} from '../../types/state';
import {BIG_NUMBER, MAX_OPERAND_LENGTH, NameSpace, OperatorsValue} from "../../const";
import {count} from "../../utils";

export const initialStateApp: AppCalculations = {
  firstOperand: '',
  secondOperand: '',

  operator: OperatorsValue.None,
  result: '0',

  isEqualActive: false,
  isFloatFirst: false,
  isFloatSecond: false,
};

export const calculations = createSlice({
  name: NameSpace.Calculator,
  initialState: initialStateApp,
  reducers: {
    setFirstOperand: (state, action) => {

      if (action.payload === '.' && state.isFloatFirst) {
        return;
      }

      if (action.payload === '.' && !state.isFloatFirst) {
        state.isFloatFirst = true;
      }

      if (action.payload === '.' && state.firstOperand === '') {
        state.isFloatFirst = true;
        state.firstOperand = '0';
      }

      console.log(action.payload)

      if (action.payload === '0' && state.firstOperand === '') {
        return;
      }

      state.firstOperand += action.payload;
      state.result = state.firstOperand;

      if (state.firstOperand.length > MAX_OPERAND_LENGTH) {
        state.result = BIG_NUMBER;
        state.firstOperand = initialStateApp.firstOperand;
        state.secondOperand = initialStateApp.secondOperand;
        state.operator = initialStateApp.operator;
        state.isEqualActive = initialStateApp.isEqualActive;
      }
    },
    setEqual: (state) => {
      if (!state.firstOperand) {
        return;
      }

      if (!state.secondOperand && !state.operator) {
        state.secondOperand = state.firstOperand;
        state.operator = OperatorsValue.Add;
        return;
      }


      if (!state.secondOperand) {
        state.secondOperand = state.firstOperand;
      }

      const result = count(Number(state.firstOperand), Number(state.secondOperand), state.operator);
      state.firstOperand = `${result}`;

      state.result = state.firstOperand;
      state.isEqualActive = true;
    },
    setOperator: (state, action) => {
      if (!state.firstOperand && action.payload === OperatorsValue.Subtract) {
        state.firstOperand = '-';
        return;
      }

      if (state.secondOperand && !state.isEqualActive) {
        const result = count(Number(state.firstOperand), Number(state.secondOperand), state.operator);

        state.firstOperand = `${result}`;
        state.secondOperand = '';
        state.isFloatSecond = false;

        state.result = state.firstOperand;
        state.operator = action.payload;
      } else {
        state.operator = action.payload;
      }

      if (state.isEqualActive) {
        state.operator = action.payload;

        state.secondOperand = '';
        state.isEqualActive = false;
      }
    },
    setSecondOperand: (state, action) => {

      if (action.payload === '.' && state.isFloatSecond) {
        return;
      }

      if (action.payload === '.' && !state.isFloatSecond) {
        state.isFloatSecond = true;
      }


      if (action.payload === '.' && state.secondOperand === '') {
        state.isFloatSecond = true;
        state.secondOperand = '0';
      }

      if (state.firstOperand === '-') {
        state.firstOperand += state.secondOperand;
        state.secondOperand = '';
        return;
      }

      if (state.secondOperand.length > MAX_OPERAND_LENGTH) {
        state.result = BIG_NUMBER;
        state.firstOperand = initialStateApp.firstOperand;
        state.secondOperand = initialStateApp.secondOperand;
        state.operator = initialStateApp.operator;
        state.isEqualActive = initialStateApp.isEqualActive;
        return;
      }

      if (action.payload === '0' && state.secondOperand === '') {
        return;
      }

      state.secondOperand += action.payload;
      state.result = state.secondOperand;
    },
    resetDisplay: (state) => {
      state.result = initialStateApp.result;
      state.firstOperand = initialStateApp.firstOperand;
      state.isFloatFirst = initialStateApp.isFloatFirst;
      state.operator = initialStateApp.operator;
      state.secondOperand = initialStateApp.secondOperand;
      state.isFloatSecond = initialStateApp.isFloatSecond;
    },
  },
});

export const {setFirstOperand, setOperator, setSecondOperand, resetDisplay, setEqual} = calculations.actions;
