import React from "react";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {getCalculatorDisplayMode} from "../../../store/process/selectors";
import {CalculatorElementsName, CalculatorMode} from "../../../const";
import {CalculatorElementsNameType} from "../../../types/state";
import {removeElement} from "../../../store/canvas/canvas";

interface DragInsideWrapperProps {
  children: JSX.Element,
  order: number,
  id: CalculatorElementsNameType,
}

const WrapperCalculatorComponentInConstructor = ({children, order, id}: DragInsideWrapperProps) => {
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const dispatch = useAppDispatch();

  const onDoubleClickComponentHandler = (evt: React.MouseEvent) => {
    if (calculatorDisplayMode === CalculatorMode.Edit) {
      const currentTarget = evt.currentTarget as HTMLElement;
      const id = currentTarget.dataset.id as CalculatorElementsNameType;

      dispatch(removeElement(id))
    }
  };

  const paddingTop = order === 0 ? '4px' : '10px';
  const paddingBottom = order === 3 ? '4px' : '10px';


  return (
    <div
      className={`component-wrapper calculator-components__wrapper ${id === CalculatorElementsName.Display ? 'pointer-events-disable' : ''}`}
      draggable={calculatorDisplayMode !== CalculatorMode.Active && id !== CalculatorElementsName.Display}
      onDoubleClick={onDoubleClickComponentHandler}
      data-id={id}
      style={{order: order, paddingTop: paddingTop, paddingBottom: paddingBottom}}
    >
      {children}
    </div>
  );
};

export default WrapperCalculatorComponentInConstructor;
