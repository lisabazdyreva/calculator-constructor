import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getDisplayMode} from '../../store/process/selectors';
import {setFirstOperand, setSecondOperand} from '../../store/calculations/calculations';
import {getOperator} from '../../store/calculations/selectors';


interface NumberButtonsProps {
  order?: number,
  disabled?: boolean,
  onDoubleClickHandler?: (evt: React.MouseEvent) => void,
  setCurrentElement?: (evt: React.DragEvent) => void,
  setStartPosition?: (startPosition: number) => void,
}

const NumberButtons = ({order, disabled, onDoubleClickHandler, setCurrentElement, setStartPosition}: NumberButtonsProps) => {
  const calculatorMode = useAppSelector(getDisplayMode);
  const operator = useAppSelector(getOperator);

  const dispatch = useAppDispatch();

  const onDragStartHandler = (evt: React.DragEvent) => {
    if (disabled || calculatorMode === 'active') {
      evt.preventDefault();
    }
  };

  const onDoubleClickComponentHandler = (evt: React.MouseEvent) => {
    if (onDoubleClickHandler && calculatorMode !== 'active') {
      onDoubleClickHandler(evt);
    }
  };

  const onDragOverHandler = (evt: React.DragEvent) => {
    if (setCurrentElement) {
      setCurrentElement(evt);
    }
  };

  const onDragEnterHandler = (evt: React.DragEvent) => {
    if (setStartPosition) {
      setStartPosition(evt.pageY);
    }
  };

  const onDragLeaveHandler = (evt: React.DragEvent) => {
    if (setCurrentElement) {
      const target = evt.currentTarget as HTMLElement;

      target.classList.remove('border-top')
      target.classList.remove('border-bottom')
    }
  };

  const onButtonClickHandler = (evt: React.MouseEvent) => {
    if (calculatorMode === 'active') {
      const target = evt.target as HTMLButtonElement;

      if (target.value && operator === '') {
        dispatch(setFirstOperand(target.value))
      }

      if (target.value && operator) {
        dispatch(setSecondOperand(target.value))
      }
    }
  };

  return (
    <div
      className={`component-wrapper calculator-components__wrapper ${disabled ? 'not-draggable' : ''}`}
      draggable={true}
      onDoubleClick={onDoubleClickComponentHandler}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragStart={onDragStartHandler}
      onDragLeave={onDragLeaveHandler}
      data-id="numbers"
      style={{order: order}}
    >
      <div className="number-buttons" onClick={onButtonClickHandler}>
        <button className="number-buttons__item" type="button">,</button>
        <button className="number-buttons__item number-buttons__item--long" type="button" value={0}>0
        </button>

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
    </div>
  );
};

export default NumberButtons;
