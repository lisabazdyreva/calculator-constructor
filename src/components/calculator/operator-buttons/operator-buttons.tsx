import React, {useEffect, useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../../../hooks';

import {setOperator} from '../../../store/calculations/calculations';
import {OperatorType} from "../../../types/state";
import {CalculatorMode} from "../../../const";
import {getCalculatorDisplayMode} from "../../../store/process/selectors";


const OperatorButtons = () => {
  const dispatch = useAppDispatch();
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);

  const dispatchOperator = useCallback((value: OperatorType) => {
    if (value) {
      dispatch(setOperator(value as OperatorType));
    }
  }, [dispatch]);

  useEffect(() => {
    if (calculatorDisplayMode === CalculatorMode.Active) {
      const onKeyDownHandler = (evt: KeyboardEvent) => {
        if (evt.key === '+' || evt.key === '-' || evt.key === '/' || evt.key === '*') {
          dispatchOperator(evt.key);
        }
      };

      document.addEventListener('keyup', onKeyDownHandler);

      return () => document.removeEventListener('keyup', onKeyDownHandler);
    }
  }, [calculatorDisplayMode, dispatchOperator]);

  const onClickOperatorsHandler = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLButtonElement;

    dispatchOperator(target.value as OperatorType);
  };

  return (
    <div className="operator-buttons" onClick={onClickOperatorsHandler}>
      <button className="operator-buttons__item" type="button" value={'/'}>/</button>
      <button className="operator-buttons__item" type="button" value={'*'}>х</button>
      <button className="operator-buttons__item" type="button" value={'-'}>-</button>
      <button className="operator-buttons__item" type="button" value={"+"}>+</button>
    </div>
  );
};

export default OperatorButtons;
