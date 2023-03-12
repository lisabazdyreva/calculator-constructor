import {AppCalculations} from '../../types/state';
import {createSlice} from '@reduxjs/toolkit';

export const initialStateApp: AppCalculations = {
  firstOperand: '',
  operator: '',
  secondOperand: '',
  result: '0',
};

export const calculations = createSlice({
  name: 'AppCalculations',
  initialState: initialStateApp,
  reducers: {
    setFirstOperand: (state, action) => {
      state.firstOperand += action.payload;
      state.result = state.firstOperand;
    },

    setEqual: (state) => {
      switch (state.operator) {
        case '+': {
          state.firstOperand = (Number(state.firstOperand) + Number(state.secondOperand)).toString();
          break;
        }
        case '-': {
          state.firstOperand = (Number(state.firstOperand) - Number(state.secondOperand)).toString();
          break;
        }
        case '*': {
          state.firstOperand = (Number(state.firstOperand) * Number(state.secondOperand)).toString();
          break;
        }
        case '/': {
          state.firstOperand = (Number(state.firstOperand) / Number(state.secondOperand)).toString();
          break;
        }
      }
      state.secondOperand = '';
      state.result = state.firstOperand;
    },
    setOperator: (state, action) => {
      if (state.secondOperand !== '' && state.operator !== initialStateApp.operator) {
        switch (state.operator) {
          case '+': {
            state.firstOperand = (Number(state.firstOperand) + Number(state.secondOperand)).toString();
            break;
          }
          case '-': {
            state.firstOperand = (Number(state.firstOperand) - Number(state.secondOperand)).toString();
            break;
          }
          case '*': {
            state.firstOperand = (Number(state.firstOperand) * Number(state.secondOperand)).toString();
            break;
          }
          case '/': {
            if (state.secondOperand === '0') {
              state.result = 'Не определено';
              break;
            }
            state.firstOperand = (Number(state.firstOperand) / Number(state.secondOperand)).toString();
            break;
          }
        }
        if (state.result !== 'Не определено') {
          state.secondOperand = '';
          state.result = state.firstOperand;

        } else {
          state.operator = initialStateApp.operator;
          state.firstOperand = initialStateApp.firstOperand;
          state.secondOperand = initialStateApp.secondOperand;
        }
      }

      if (state.result !== 'Не определено') {
        state.operator = action.payload;
      }


    },
    setSecondOperand: (state, action) => {
      state.secondOperand += action.payload;
      state.result = state.secondOperand;
    },
    resetDisplay: (state) => {
      state.result = initialStateApp.result;
      state.firstOperand = initialStateApp.firstOperand;
      state.operator = initialStateApp.operator;
      state.secondOperand = initialStateApp.secondOperand;
    },
  },
});

export const {setFirstOperand, setOperator, setSecondOperand, resetDisplay, setEqual} = calculations.actions;
