import React, {useState} from "react";

import Display from '../calculator-elements/display';
import OperatorButtons from '../calculator-elements/operator-buttons';
import NumberButtons from '../calculator-elements/number-buttons';
import EqualButton from '../calculator-elements/equal-button';

import {useAppDispatch, useAppSelector} from '../../hooks';

import {replaceElement} from '../../store/canvas/canvas';
import {getCalculatorElements} from '../../store/canvas/selectors';
import {CalculatorElementsName} from "../../const";
import {CalculatorElementsNameType} from "../../types/state";
import DragInsideWrapper from "../calculator-elements-wrapper/drag-inside-wrapper";

const CalculatorConstructor = () => {
  const elementsToRender: string[] = useAppSelector(getCalculatorElements);
  const dispatch = useAppDispatch();

  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

  let positionElement: HTMLElement;

  const onCalculatorDragStart = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;

    if (target.dataset.id) {
      setActiveElement(target);
    }
  };


  const onCalculatorDropHandler = (evt: React.DragEvent) => {
    if (activeElement && positionElement && activeElement !== positionElement) {
      const activeElementId = activeElement.dataset.id as CalculatorElementsNameType;
      const elementToReplaceId = positionElement.dataset.id as CalculatorElementsNameType;

      dispatch(replaceElement({activeElementId, elementToReplaceId}));

      setActiveElement(null);
    }

    if (activeElement && positionElement) {
      const target = evt.target as HTMLElement;

      target.classList.remove('border-bottom');
      target.classList.remove('border-top');
    }
  };

  const setPositionElement = (element: HTMLElement) => {
    if (element !== positionElement) {
      positionElement = element;
    }
  };

  return (
    <>
      <div className="calculator-components" onDragStart={onCalculatorDragStart} onDrop={onCalculatorDropHandler}>
        {elementsToRender.includes(CalculatorElementsName.Display) &&
          <DragInsideWrapper
            order={0}
            id={CalculatorElementsName.Display}
            children={<Display/>}
            activeElement={activeElement}
            setPositionElement={setPositionElement}
          />
        }
        {elementsToRender.includes(CalculatorElementsName.Operators) &&
          <DragInsideWrapper
            order={elementsToRender.indexOf(CalculatorElementsName.Operators)}
            id={CalculatorElementsName.Operators}
            children={<OperatorButtons/>}
            activeElement={activeElement}
            setPositionElement={setPositionElement}
          />
        }
        {elementsToRender.includes(CalculatorElementsName.Numbers) &&
          <DragInsideWrapper
            order={elementsToRender.indexOf(CalculatorElementsName.Numbers)}
            id={CalculatorElementsName.Numbers}
            children={<NumberButtons/>}
            activeElement={activeElement}
            setPositionElement={setPositionElement}
          />
        }
        {elementsToRender.includes(CalculatorElementsName.Equal) &&
          <DragInsideWrapper
            order={elementsToRender.indexOf(CalculatorElementsName.Equal)}
            id={CalculatorElementsName.Equal}
            children={<EqualButton/>}
            activeElement={activeElement}
            setPositionElement={setPositionElement}
          />
        }
      </div>
    </>

  );
};

export default CalculatorConstructor;
