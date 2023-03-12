import React from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getDisplayMode} from '../../store/process/selectors';
import display from './display';
import {setEqual} from '../../store/calculations/calculations';

interface EqualButtonProps {
  order?: number,
  disabled?: boolean,
  onDoubleClickHandler?: (evt: React.MouseEvent) => void,
  setCurrentElement?: (evt: React.DragEvent) => void,
  setStartPosition?: (startPosition: number) => void,
}

const EqualButton = ({order, disabled, onDoubleClickHandler, setCurrentElement, setStartPosition}: EqualButtonProps) => {

  const calculatorMode = useAppSelector(getDisplayMode);
  const dispatch = useAppDispatch();

  const onDragStartHandler = (evt: React.DragEvent) => {
    if (disabled || calculatorMode === 'active') {
      evt.preventDefault();
    }
  };

  const onDoubleClickComponentHandler = (evt: React.MouseEvent) => {
    if (onDoubleClickHandler) {
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

  const onClickHandler = () => {
    if (calculatorMode === 'active') {
      dispatch(setEqual());
    }
  };

  return (
    <div
      className={`component-wrapper calculator-components__wrapper ${disabled ? 'not-draggable' : ''}`}
      draggable={true}
      onDragStart={onDragStartHandler}
      onDragEnter={onDragEnterHandler}
      onDragLeave={onDragLeaveHandler}
      onDragOver={onDragOverHandler}
      onDoubleClick={onDoubleClickComponentHandler}
      data-id="equal"
      style={{order: order}}
    >
      <button className="equal-button" type="button" onClick={onClickHandler}>=</button>
    </div>
  );
};
// TODO naming
export default EqualButton;
