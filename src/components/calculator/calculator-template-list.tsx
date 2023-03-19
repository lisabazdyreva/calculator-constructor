import React from "react";

import Display from "./display/display";
import OperatorButtons from "./operator-buttons/operator-buttons";
import NumberButtons from "./number-buttons/number-buttons";
import EqualButton from "./equal-button/equal-button";

import { useAppSelector } from "../../hooks";
import { getCalculatorDisplayMode } from "../../store/process/selectors";
import { getCalculatorElements } from "../../store/calculator-construction/selectors";

import { CalculatorElementsName, CalculatorMode } from "../../const";
import { CalculatorElementsNameType } from "../../types/state";
import WrapperCalculatorComponentInTemplateList from "./wrapper-calculator-component/wrapper-calculator-component-in-template-list";

interface CalculatorComponentsProps {
  setElementId: (id: CalculatorElementsNameType) => void;
}

const CalculatorTemplateList = ({
  setElementId,
}: CalculatorComponentsProps) => {
  const draggedElements: string[] = useAppSelector(getCalculatorElements);
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);

  const onDragHandler = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;
    const id = target.dataset.id as CalculatorElementsNameType;

    setElementId(id);
  };

  return (
    <div className="calculator-components" onDragStart={onDragHandler}>
      {calculatorDisplayMode === CalculatorMode.Edit && (
        <>
          <WrapperCalculatorComponentInTemplateList
            disabled={draggedElements.includes(CalculatorElementsName.Display)}
            id={CalculatorElementsName.Display}
            children={<Display />}
          />
          <WrapperCalculatorComponentInTemplateList
            disabled={draggedElements.includes(
              CalculatorElementsName.Operators
            )}
            id={CalculatorElementsName.Operators}
            children={<OperatorButtons />}
          />
          <WrapperCalculatorComponentInTemplateList
            disabled={draggedElements.includes(CalculatorElementsName.Numbers)}
            id={CalculatorElementsName.Numbers}
            children={<NumberButtons />}
          />
          <WrapperCalculatorComponentInTemplateList
            disabled={draggedElements.includes(CalculatorElementsName.Equal)}
            id={CalculatorElementsName.Equal}
            children={<EqualButton />}
          />
        </>
      )}
    </div>
  );
};

export default CalculatorTemplateList;
