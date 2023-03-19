import React from "react";

import DragInsideWrapper from "../calculator-elements-wrapper/drag-inside-wrapper";
import Display from "../calculator-elements/display";
import OperatorButtons from "../calculator-elements/operator-buttons";
import NumberButtons from "../calculator-elements/number-buttons";
import EqualButton from "../calculator-elements/equal-button";

import {CalculatorElementsName} from "../../const";

import {useAppSelector} from "../../hooks";
import {getCalculatorElements} from "../../store/canvas/selectors";

const CalculatorConstructorNew = () => {
  const elementsToRender: string[] = useAppSelector(getCalculatorElements);

  return (
    <div className="calculator-components">
      {elementsToRender.map((element, index) => {
        switch (element) {
          case CalculatorElementsName.Display: {
            return <DragInsideWrapper key={element} order={0} id={element} children={<Display/>}/>;
          }
          case CalculatorElementsName.Equal: {
            return <DragInsideWrapper key={element} order={index} id={element} children={<EqualButton/>}/>;
          }
          case CalculatorElementsName.Operators: {
            return <DragInsideWrapper key={element} order={index} id={element} children={<OperatorButtons/>}/>
          }
          case CalculatorElementsName.Numbers: {
            return <DragInsideWrapper key={element} order={index} id={element} children={<NumberButtons/>}/>
          }
        }
      })}
    </div>
  );
};


export default CalculatorConstructorNew;
