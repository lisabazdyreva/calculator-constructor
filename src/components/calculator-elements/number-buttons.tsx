import React from 'react';

import {useAppDispatch, useAppSelector} from '../../hooks';

import {getCalculatorDisplayMode} from '../../store/process/selectors';
import {getOperator} from '../../store/calculations/selectors';

import {setFirstOperand, setSecondOperand} from '../../store/calculations/calculations';

import {CalculatorMode, OperatorsValue} from "../../const";


const NumberButtons = () => {
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const operator = useAppSelector(getOperator);

  const dispatch = useAppDispatch();


  const onButtonClickHandler = (evt: React.MouseEvent) => {
    if (calculatorDisplayMode === CalculatorMode.Active) {
      const target = evt.target as HTMLButtonElement;

      if (target.value && operator === OperatorsValue.None) {
        dispatch(setFirstOperand(target.value))
      }

      if (target.value && operator) {
        dispatch(setSecondOperand(target.value))
      }
    }
  };

  return (
      <div className="number-buttons" onClick={onButtonClickHandler}>
        <button className="number-buttons__item" type="button">,</button>
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
