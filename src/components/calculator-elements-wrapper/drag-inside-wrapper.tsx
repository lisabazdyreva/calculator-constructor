import React from "react";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCalculatorDisplayMode} from "../../store/process/selectors";
import {CalculatorElementsName, CalculatorMode} from "../../const";
import {CalculatorElementsNameType} from "../../types/state";
import {removeElement} from "../../store/canvas/canvas";

interface DragInsideWrapperProps {
  children: JSX.Element,
  order: number,
  id: CalculatorElementsNameType,
  activeElement?: HTMLElement | null,
  setPositionElement?: (element: HTMLElement) => void,
}

const DragInsideWrapper = ({children, order, id, activeElement, setPositionElement}: DragInsideWrapperProps) => {
  let cursorPositionStart: number;

  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const dispatch = useAppDispatch();

  const onDoubleClickComponentHandler = (evt: React.MouseEvent) => {
    if (calculatorDisplayMode === CalculatorMode.Edit) {
      const currentTarget = evt.currentTarget as HTMLElement;
      const id = currentTarget.dataset.id as CalculatorElementsNameType;

      dispatch(removeElement(id))
    }
  };

  // const onDragEnterHandler = (evt: React.DragEvent) => {
  //   evt.preventDefault()
  //   cursorPositionStart = evt.pageY;
  // };
  //
  // const onDragLeaveHandler = (evt: React.DragEvent) => {
  //   evt.preventDefault()
  //   const target = evt.currentTarget as HTMLElement;
  //
  //   target.classList.remove('border-top')
  //   target.classList.remove('border-bottom')
  // };
  //
  // const onDragOverHandler = (evt: React.DragEvent) => {
  //   // evt.preventDefault();
  //   let currentElement = evt.currentTarget as HTMLElement;
  //
  //   if (activeElement && id === CalculatorElementsName.Display) {
  //     currentElement.classList.add('border-bottom');
  //     setPositionElement(currentElement);
  //   }
  //
  //   if (activeElement && id !== CalculatorElementsName.Display) {
  //     // from down
  //     if (cursorPositionStart - evt.pageY - currentElement.clientHeight / 2 > 0) {
  //       if (currentElement !== activeElement) {
  //         currentElement.classList.remove('border-bottom')
  //         currentElement.classList.add('border-top')
  //       }
  //       setPositionElement(currentElement);
  //     } else if (cursorPositionStart - evt.pageY > 0) {
  //       if (currentElement !== activeElement) {
  //         currentElement.classList.add('border-bottom');
  //         currentElement.classList.remove('border-top');
  //       }
  //     }
  //
  //     //  from up
  //     if (cursorPositionStart - evt.pageY + currentElement.clientHeight / 2 < 0) {
  //       if (activeElement !== currentElement) {
  //         currentElement.classList.add('border-bottom');
  //         currentElement.classList.remove('border-top');
  //       }
  //       setPositionElement(currentElement);
  //     } else if (cursorPositionStart - evt.pageY < 0) {
  //       if (currentElement !== activeElement) {
  //         currentElement.classList.remove('border-bottom');
  //         currentElement.classList.add('border-top');
  //       }
  //
  //     }
  //   }
  // };



  return (
    <div
      className={`component-wrapper calculator-components__wrapper ${id === CalculatorElementsName.Display ? 'pointer-events-disable' : ''}`}
      draggable={calculatorDisplayMode !== CalculatorMode.Active && id !== CalculatorElementsName.Display}
      onDoubleClick={onDoubleClickComponentHandler}
      // onDragEnter={onDragEnterHandler}
      // onDragLeave={onDragLeaveHandler}
      // onDragOver={onDragOverHandler}
      data-id={id}
      style={{order: order}}
    >
      {children}
    </div>
  );
};

export default DragInsideWrapper;
