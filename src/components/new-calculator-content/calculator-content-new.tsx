import React from "react";

import CalculatorComponents from "../calculator-content/calculator-components";
import DropArea from "../drop-area";
import CalculatorConstructor from "../calculator-content/calculator-constructor";

import {useAppSelector} from "../../hooks";
import {useDrag} from '../../hooks/use-drag';

import {getCalculatorDisplayMode} from "../../store/process/selectors";
import {getCalculatorElements} from "../../store/canvas/selectors";

import {CalculatorMode} from "../../const";


const CalculatorContentNew = () => {
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const calculatorElements = useAppSelector(getCalculatorElements);

  const {onDragStart, onDragEnter, onDragLeave, onDragOver, onDrop, setElementId} = useDrag();

  const onDragStartHandler = (evt: React.DragEvent) => onDragStart(evt);
  const onDragEnterHandler = (evt: React.DragEvent) => onDragEnter(evt);
  const onDragLeaveHandler = (evt: React.DragEvent) => onDragLeave(evt);
  const onDragOverHandler = (evt: React.DragEvent) => onDragOver(evt);
  const onDropHandler = (evt: React.DragEvent) => onDrop(evt);

  const activeClass = calculatorDisplayMode === CalculatorMode.Active ? ' calculator--active ' : '';
  const editEmptyClass = calculatorDisplayMode === CalculatorMode.Edit && !calculatorElements.length ? ' calculator--canvas-empty ' : '';
  const editFullClass = calculatorDisplayMode === CalculatorMode.Edit && calculatorElements.length ? ' calculator--canvas-full ' : '';

  const calculatorClassname = `calculator${activeClass}${editEmptyClass}${editFullClass}`;

  return (
    <div className="calculator-content main__calculator-content">
      <CalculatorComponents setElementId={setElementId}/>
      <div
        className="calculator-wrapper"
        onDragEnter={onDragEnterHandler}
        onDragLeave={onDragLeaveHandler}
        onDragStart={onDragStartHandler}
        onDragOver={onDragOverHandler}
        onDrop={onDropHandler}
      >
        <div className={calculatorClassname}>
          <DropArea />
          <CalculatorConstructor/>
        </div>
      </div>
    </div>
  );
};

export default CalculatorContentNew;
