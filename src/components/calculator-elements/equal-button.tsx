import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';

import {getCalculatorDisplayMode} from '../../store/process/selectors';


import {setEqual} from '../../store/calculations/calculations';
import {CalculatorMode} from "../../const";


const EqualButton = () => {

  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    if (calculatorDisplayMode === CalculatorMode.Active) {
      dispatch(setEqual());
    }
  };

  useEffect(() => {
    if (calculatorDisplayMode === CalculatorMode.Active) {
      const onKeyDownHandler = (evt: KeyboardEvent) => {
        if (evt.key === '=' || evt.key === 'Enter') {
          dispatch(setEqual());
        }
      };

      document.addEventListener('keyup', onKeyDownHandler);

      return () => document.removeEventListener('keyup', onKeyDownHandler);
    }
  }, [calculatorDisplayMode, dispatch]);

  return (
    <button className="equal-button" type="button" onClick={onClickHandler}>=</button>
  );
};

export default EqualButton;
