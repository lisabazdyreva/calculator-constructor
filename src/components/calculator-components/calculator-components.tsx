import React from "react";

import Display from './display';
import OperatorButtons from './operator-buttons';
import NumberButtons from './number-buttons';
import EqualButton from './equal-button';

import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCalculatorElements, getDisplayMode} from '../../store/process/selectors';


interface CalculatorComponentsProps {
  setElementId: (id: string) => void;
}

const CalculatorComponents = ({setElementId}: CalculatorComponentsProps) => {
  const draggedElements: string[] = useAppSelector(getCalculatorElements);
  const displayMode = useAppSelector(getDisplayMode);

  const onDragHandler = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;
    const id = target.dataset.id || '';

    setElementId(id);
  };


  //TODO в переменные вынести display
  return (
      <div className={`calculator-components ${displayMode === 'active' ? 'hidden': ''}`} onDragStart={onDragHandler}>
          <Display disabled={draggedElements.includes('display')} />
          <OperatorButtons disabled={draggedElements.includes('operators')} />
          <NumberButtons disabled={draggedElements.includes('numbers')} />
          <EqualButton disabled={draggedElements.includes('equal')}/>
      </div>
  );
};

export default CalculatorComponents;
