import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getDisplayMode} from '../../store/process/selectors';
import {setOperator} from '../../store/calculations/calculations';
import {getOperator} from '../../store/calculations/selectors';


interface OperatorButtonsProps {
  order?: number,
  disabled?: boolean,
  onDoubleClickHandler?: (evt: React.MouseEvent) => void,
  setCurrentElement?: (evt: React.DragEvent) => void,
  setStartPosition?: (startPosition: number) => void,
}

const OperatorButtons = ({order, disabled, onDoubleClickHandler, setCurrentElement, setStartPosition}: OperatorButtonsProps) => {
  const calculatorMode = useAppSelector(getDisplayMode);

  const dispatch = useAppDispatch();

  const onDragStartHandler = (evt: React.DragEvent) => {
    if (disabled || calculatorMode === 'active') {
      evt.preventDefault();
    }
  };


  const onDoubleClickComponentHandler = (evt: any) => {
      if (onDoubleClickHandler && calculatorMode === 'edit') {
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


  const onClickOperatorsHandler = (evt: React.MouseEvent) => {
    const target = evt.target as HTMLButtonElement;

    if (target.value) {
      dispatch(setOperator(target.value));
    }
  };

  return (
    <div
      className={`component-wrapper calculator-components__wrapper ${disabled ? 'not-draggable' : ''}`}
      onDoubleClick={onDoubleClickComponentHandler}
      draggable={true}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragStart={onDragStartHandler}
      onDragLeave={onDragLeaveHandler}
      data-id="operators"
      style={{order: order}}
    >
      <div className="operator-buttons" onClick={onClickOperatorsHandler}>
        <button className="operator-buttons__item" type="button" value={'/'}>/</button>
        <button className="operator-buttons__item" type="button" value={'*'}>х</button>
        <button className="operator-buttons__item" type="button" value={'-'}>-</button>
        <button className="operator-buttons__item" type="button" value={"+"}>+</button>
      </div>
    </div>
  );
};

export default OperatorButtons;
