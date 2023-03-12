import React from 'react';

import {useAppDispatch} from '../../hooks';

import {setOperator} from '../../store/calculations/calculations';
import {OperatorType} from "../../types/state";


const OperatorButtons = () => {
  const dispatch = useAppDispatch();

  const onClickOperatorsHandler = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLButtonElement;

    if (target.value) {
      dispatch(setOperator(target.value as OperatorType));
    }
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
