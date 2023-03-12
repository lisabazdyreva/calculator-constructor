import React, {useEffect, useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';

import {getCalculatorDisplayMode} from '../../store/process/selectors';
import {getOperator} from '../../store/calculations/selectors';

import {setFirstOperand, setSecondOperand} from '../../store/calculations/calculations';

import {CalculatorMode, OperatorsValue} from "../../const";


const NumberButtons = () => {
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const operator = useAppSelector(getOperator);

  const dispatch = useAppDispatch();

  const dispatchOperands = useCallback((value: number | string) => {

    if (value && operator === OperatorsValue.None) {
      dispatch(setFirstOperand(value))
    }

    if (value && operator) {
      dispatch(setSecondOperand(value))
    }

  }, [dispatch, operator]);

  const onButtonClickHandler = (evt: React.MouseEvent) => {
    if (calculatorDisplayMode === CalculatorMode.Active) {
      const target = evt.target as HTMLButtonElement;

      dispatchOperands(target.value);
    }
  };

  useEffect(() => {
    if (calculatorDisplayMode === CalculatorMode.Active) {
      const onKeyDownHandler = (evt: KeyboardEvent) => {
        if (evt.key === '0' || evt.key === '1' || evt.key === '2' || evt.key === '3' || evt.key === '4' || evt.key === '5' || evt.key === '6' || evt.key === '7' || evt.key === '8' || evt.key === '9') {
          dispatchOperands(evt.key);
        }
      };

      document.addEventListener('keyup', onKeyDownHandler);

      return () => document.removeEventListener('keyup', onKeyDownHandler);
    }
  }, [calculatorDisplayMode, dispatchOperands]);

  return (
    <div className="number-buttons" onClick={onButtonClickHandler}>
      <button className="number-buttons__item" type="button" value={'.'}>,</button>
      <button className="number-buttons__item number-buttons__item--long" type="button" value={0}>0</button>
      <button className="number-buttons__item" type="button" value={1}>1</button>
      <button className="number-buttons__item" type="button" value={2}>2</button>
      <button className="number-buttons__item" type="button" value={3}>3</button>
      <button className="number-buttons__item" type="button" value={4}>4</button>
      <button className="number-buttons__item" type="button" value={5}>5</button>
      <button className="number-buttons__item" type="button" value={6}>6</button>
      <button className="number-buttons__item" type="button" value={7}>7</button>
      <button className="number-buttons__item" type="button" value={8}>8</button>
      <button className="number-buttons__item" type="button" value={9}>9</button>
    </div>
  );
};

export default NumberButtons;
