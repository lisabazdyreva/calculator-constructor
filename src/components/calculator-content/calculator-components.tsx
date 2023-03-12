import React from "react";

import Display from '../calculator-elements/display';
import OperatorButtons from '../calculator-elements/operator-buttons';
import NumberButtons from '../calculator-elements/number-buttons';
import EqualButton from '../calculator-elements/equal-button';

import {useAppSelector} from "../../hooks";
import {getCalculatorDisplayMode} from '../../store/process/selectors';
import {getCalculatorElements} from '../../store/canvas/selectors';

import {CalculatorElementsName, CalculatorMode} from "../../const";
import {CalculatorElementsNameType} from "../../types/state";
import SimpleWrapper from "../calculator-elements-wrapper/simple-wrapper";


interface CalculatorComponentsProps {
  setElementId: (id: CalculatorElementsNameType) => void;
}

const CalculatorComponents = ({setElementId}: CalculatorComponentsProps) => {
  const draggedElements: string[] = useAppSelector(getCalculatorElements);
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);

  const onDragHandler = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;
    const id = target.dataset.id as CalculatorElementsNameType || '';

    setElementId(id);
  };

  return (
    <div className='calculator-components' onDragStart={onDragHandler}>
      {calculatorDisplayMode === CalculatorMode.Edit && <><SimpleWrapper
        disabled={draggedElements.includes(CalculatorElementsName.Display)} id={CalculatorElementsName.Display}
        children={<Display/>}/>
        <SimpleWrapper disabled={draggedElements.includes(CalculatorElementsName.Operators)}
                       id={CalculatorElementsName.Operators} children={<OperatorButtons/>}/>
        <SimpleWrapper disabled={draggedElements.includes(CalculatorElementsName.Numbers)}
                       id={CalculatorElementsName.Numbers} children={<NumberButtons/>}/>
        <SimpleWrapper disabled={draggedElements.includes(CalculatorElementsName.Equal)}
                       id={CalculatorElementsName.Equal} children={<EqualButton/>}/></>}
    </div>
  );
};

export default CalculatorComponents;
