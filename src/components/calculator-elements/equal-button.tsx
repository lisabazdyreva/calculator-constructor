import React from 'react';
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

  return (
      <button className="equal-button" type="button" onClick={onClickHandler}>=</button>
  );
};
// TODO naming
export default EqualButton;
