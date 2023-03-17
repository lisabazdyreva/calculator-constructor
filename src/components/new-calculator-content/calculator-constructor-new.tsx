import {CalculatorElementsName} from "../../const";
import DragInsideWrapper from "../calculator-elements-wrapper/drag-inside-wrapper";
import Display from "../calculator-elements/display";
import OperatorButtons from "../calculator-elements/operator-buttons";
import NumberButtons from "../calculator-elements/number-buttons";
import EqualButton from "../calculator-elements/equal-button";
import React from "react";
import {useAppSelector} from "../../hooks";
import {getCalculatorElements} from "../../store/canvas/selectors";

const CalculatorConstructorNew = () => {
  const elementsToRender: string[] = useAppSelector(getCalculatorElements);

  return (
    <div className="calculator-components">
      {elementsToRender.map((element, index) => {
        switch (element) {
          case CalculatorElementsName.Display: {
            return <DragInsideWrapper order={0} id={element} children={<Display/>}/>;
          }
          case CalculatorElementsName.Equal: {
            return <DragInsideWrapper order={index} id={element} children={<EqualButton/>}/>;
          }
          case CalculatorElementsName.Operators: {
            return <DragInsideWrapper order={index} id={element} children={<OperatorButtons/>}/>
          }
          case CalculatorElementsName.Numbers: {
            return <DragInsideWrapper order={index} id={element} children={<NumberButtons/>}/>
          }
        }
      })}
      {/*{elementsToRender.includes(CalculatorElementsName.Display) &&*/}
      {/*  <DragInsideWrapper*/}
      {/*    order={0}*/}
      {/*    id={CalculatorElementsName.Display}*/}
      {/*    children={<Display/>}*/}
      {/*  />*/}
      {/*}*/}
      {/*{elementsToRender.includes(CalculatorElementsName.Operators) &&*/}
      {/*  <DragInsideWrapper*/}
      {/*    order={elementsToRender.indexOf(CalculatorElementsName.Operators)}*/}
      {/*    id={CalculatorElementsName.Operators}*/}
      {/*    children={<OperatorButtons/>}*/}
      {/*  />*/}
      {/*}*/}
      {/*{elementsToRender.includes(CalculatorElementsName.Numbers) &&*/}
      {/*  <DragInsideWrapper*/}
      {/*    order={elementsToRender.indexOf(CalculatorElementsName.Numbers)}*/}
      {/*    id={CalculatorElementsName.Numbers}*/}
      {/*    children={<NumberButtons/>}*/}

      {/*  />*/}
      {/*}*/}
      {/*{elementsToRender.includes(CalculatorElementsName.Equal) &&*/}
      {/*  <DragInsideWrapper*/}
      {/*    order={elementsToRender.indexOf(CalculatorElementsName.Equal)}*/}
      {/*    id={CalculatorElementsName.Equal}*/}
      {/*    children={<EqualButton/>}*/}
      {/*  />*/}
      {/*}*/}
    </div>
  );
};


export default CalculatorConstructorNew;
