import React from "react";

import CalculatorComponents from "./calculator-components";
import DropArea from "../drop-area";

import {useAppSelector} from "../../hooks";
import {useDragNDrop} from '../../hooks/use-drag-n-drop';

import {getCalculatorDisplayMode} from "../../store/process/selectors";
import {getCalculatorElements} from "../../store/canvas/selectors";

import {CalculatorMode} from "../../const";
import CalculatorConstructorNew from "./calculator-constructor-new";


const CalculatorContentNew = () => {
  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const calculatorElements = useAppSelector(getCalculatorElements);

  const {onDragStart, onDragEnter, onDragLeave, onDragOver, onDrop, setElementId} = useDragNDrop();

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
          <CalculatorConstructorNew/>
        </div>
      </div>
    </div>
  );
};

export default CalculatorContentNew;