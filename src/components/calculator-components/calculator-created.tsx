import React from "react";

import Display from './display';
import OperatorButtons from './operator-buttons';
import NumberButtons from './number-buttons';
import EqualButton from './equal-button';
import {removeElement, replaceElement} from '../../store/process/process';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCalculatorElements} from '../../store/process/selectors';
import {createSecureContext} from 'tls';
import {getDisplay} from '../../store/calculations/selectors';

const CalculatorCreated = () => {
 const result = useAppSelector(getDisplay);
  const elementsToRender: string[] = useAppSelector(getCalculatorElements);
  const dispatch = useAppDispatch();

  let activeElement: HTMLElement;
  let currentElement: HTMLElement;
  let positionElement: HTMLElement;
  let cursorPositionStart: number;

  const onDoubleClickHandler = (evt: React.MouseEvent) => {
    const currentTarget = evt.currentTarget as HTMLElement;
    const id = currentTarget.dataset.id;

    dispatch(removeElement(id))
  };

  const onDropHandler = (evt: React.DragEvent) => {
    if (activeElement && positionElement && activeElement !== positionElement) {
      dispatch(replaceElement({elem: activeElement.dataset.id, oldElem: positionElement.dataset.id}));
    }
    if (activeElement && positionElement) {
      currentElement.classList.remove('border-bottom');
      currentElement.classList.remove('border-top');
    }

  };

  const setStartPosition = (startPosition: number) => {
    cursorPositionStart = startPosition;
  };


  const setCurrentElement = (evt: React.DragEvent, ) => {
    currentElement = evt.currentTarget as HTMLElement;

    if (currentElement !== activeElement) {
      if (cursorPositionStart - evt.pageY > 0) {
        currentElement.classList.add('border-bottom');
        currentElement.classList.remove('border-top');


        positionElement = activeElement;
        // from down
      }

      if (cursorPositionStart - evt.pageY - currentElement.clientHeight / 2 > 0) {
        currentElement.classList.remove('border-bottom')
        currentElement.classList.add('border-top')

        positionElement = currentElement;
      }


      if (cursorPositionStart - evt.pageY < 0) {
        currentElement.classList.remove('border-bottom');
        currentElement.classList.add('border-top');

        positionElement = activeElement;

      //  from up
      }

      if (cursorPositionStart - evt.pageY + currentElement.clientHeight / 2 < 0) {
        currentElement.classList.add('border-bottom');
        currentElement.classList.remove('border-top');

        positionElement = currentElement;
      }
    }
  };

  const onDragStart = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;
    if (target.dataset.id) {
      activeElement = target;
    }
  };


  //todo вынести в переменные
  //
  return (
    <>
      <div className="calculator-components" onDragStart={onDragStart} onDrop={onDropHandler}>
        {elementsToRender.includes('display') &&
          <Display
            order={0}
            setCurrentElement={setCurrentElement}
            onDoubleClickHandler={onDoubleClickHandler}
          />}
        {elementsToRender.includes('operators') &&
          <OperatorButtons
            order={elementsToRender.indexOf('operators') + 1}
            setCurrentElement={setCurrentElement}
            onDoubleClickHandler={onDoubleClickHandler}
            setStartPosition={setStartPosition}
          />
        }
        {elementsToRender.includes('numbers') &&
          <NumberButtons
            order={elementsToRender.indexOf('numbers') + 1}
            setCurrentElement={setCurrentElement}
            onDoubleClickHandler={onDoubleClickHandler}
          />
        }
        {elementsToRender.includes('equal') &&
          <EqualButton
            order={elementsToRender.indexOf('equal') + 1}
            setCurrentElement={setCurrentElement}
            onDoubleClickHandler={onDoubleClickHandler}
            setStartPosition={setStartPosition}
          />
        }
      </div>
    </>

  );
};

export default CalculatorCreated;
