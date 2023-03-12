import React from 'react';

import CalculatorComponents from '../calculator-components/calculator-components';
import DropArea from '../drop-area/drop-area';
import CalculatorCreated from '../calculator-components/calculator-created';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCalculatorElements, getDisplayMode,} from '../../store/process/selectors';
import {setElement} from '../../store/process/process';

const CalculatorContent = () => {
  let idPreSet: string;

  const dispatch = useAppDispatch();

  const calculatorMode = useAppSelector(getDisplayMode);
  const calculatorElements = useAppSelector(getCalculatorElements);

  const onDragLeaveHandler = (evt: React.DragEvent) => {
    const currentTarget = evt.currentTarget as HTMLElement;

    if (currentTarget.classList.contains('droppable-canvas--active')) {
      currentTarget.classList.remove('droppable-canvas--active')
    }
  };

  const onDragOverHandler = (evt: React.DragEvent) => {
    const currentTarget = evt.currentTarget as HTMLElement;
    evt.preventDefault();

    if (currentTarget.classList.contains('calculator--canvas-empty')) {
      currentTarget.classList.add('droppable-canvas--active')
    }
  };

  const onDropHandler = (evt: React.DragEvent) => {
    evt.preventDefault();

    dispatch(setElement(idPreSet));
  };

  const setElementId = (id: string) => {
    idPreSet = id;
  };

  const calculatorClassname = `calculator${calculatorMode === 'active' ? ' calculator--active ' : ''}${calculatorMode === 'edit' && !calculatorElements.length ? ' calculator--canvas-empty ' : ''} ${calculatorMode === 'edit' && calculatorElements.length ? ' calculator--canvas-full ' : ''}`;

  return (
    <div className="calculator-content main__calculator-content">{/* <!-- todo calculator-content--active calculator-content--edit-->*/}
      <CalculatorComponents setElementId={setElementId} />
      <div className="calculator-wrapper">
        <div className={calculatorClassname} onDragLeave={onDragLeaveHandler} onDragOver={onDragOverHandler} onDrop={onDropHandler}>{/*<!-- calculator--canvas-full calculator--canvas-empty  -->*/}
          <DropArea />
          <CalculatorCreated/>
        </div>
      </div>
    </div>
  );
};

export default CalculatorContent;
