import React from 'react';

import CalculatorComponents from './calculator-components';
import DropArea from '../drop-area';
import CalculatorConstructor from './calculator-constructor';

import {useAppDispatch, useAppSelector} from '../../hooks';

import {getCalculatorDisplayMode} from '../../store/process/selectors';
import {setElement} from '../../store/canvas/canvas';
import {getCalculatorElements} from '../../store/canvas/selectors';
import {CalculatorElementsNameType} from "../../types/state";

import {CalculatorMode} from "../../const";

const CalculatorContent = () => {
  let idPreSet: CalculatorElementsNameType;

  const dispatch = useAppDispatch();

  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const calculatorElements = useAppSelector(getCalculatorElements);

  const removeBorder = (element: Element) => {
    if (element.classList.contains('border-bottom')) {
      element.classList.remove('border-bottom');
    }
  };

  const addBorder = (element: Element) => {
    if (!element.classList.contains('border-bottom')) {
      element.classList.add('border-bottom');
    }
  };

  const onDragLeaveHandler = (evt: React.DragEvent) => {
    evt.preventDefault();

    const currentTarget = evt.currentTarget as HTMLElement;

    if (currentTarget.classList.contains('droppable-canvas--active')) {
      currentTarget.classList.remove('droppable-canvas--active')
    }

    if (currentTarget.classList.contains('calculator--canvas-full')) {
      const wrapper = currentTarget.children[currentTarget.children.length - 1];
      removeBorder(wrapper.children[wrapper.children.length - 1]);
    }
  };

  const onDragOverHandler = (evt: React.DragEvent) => {
    evt.preventDefault();

    console.log('hi')

    if (idPreSet) {
      const currentTarget = evt.currentTarget as HTMLElement;

      if (currentTarget.classList.contains('calculator--canvas-empty')) {
        currentTarget.classList.add('droppable-canvas--active')
      }

      if (currentTarget.classList.contains('calculator--canvas-full')) {
        const wrapper = currentTarget.children[currentTarget.children.length - 1];
        addBorder(wrapper.children[wrapper.children.length - 1]);
      }
    }
  };

  const onDropHandler = (evt: React.DragEvent) => {
    const currentTarget = evt.currentTarget as HTMLElement;

    if (idPreSet) {
      evt.preventDefault();

      if (currentTarget.classList.contains('calculator--canvas-full')) {
        const wrapper = currentTarget.children[currentTarget.children.length - 1];
        removeBorder(wrapper.children[wrapper.children.length - 1]);
      }

      dispatch(setElement(idPreSet));
    }

  };

  const setElementId = (id: CalculatorElementsNameType) => {
    idPreSet = id;
  };

  const activeClass = calculatorDisplayMode === CalculatorMode.Active ? ' calculator--active ' : '';

  const editEmptyClass = calculatorDisplayMode === CalculatorMode.Edit && !calculatorElements.length ? ' calculator--canvas-empty ' : '';
  const editFullClass = calculatorDisplayMode === CalculatorMode.Edit && calculatorElements.length ? ' calculator--canvas-full ' : '';

  const calculatorClassname = `calculator${activeClass}${editEmptyClass}${editFullClass}`;

  return (
    <div className="calculator-content main__calculator-content">
      {/*<CalculatorComponents setElementId={setElementId}/>*/}
      <div className="calculator-wrapper">
        <div className={calculatorClassname} onDragLeave={onDragLeaveHandler} onDragOver={onDragOverHandler}
             onDrop={onDropHandler}>
          <DropArea />
          <CalculatorConstructor/>
        </div>
      </div>
    </div>
  );
};

export default CalculatorContent;
