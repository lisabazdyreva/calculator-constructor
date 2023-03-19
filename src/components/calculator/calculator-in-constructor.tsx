import React from "react";

import WrapperCalculatorComponentInConstructor from "./wrapper-calculator-component/wrapper-calculator-component-in-constructor";
import Display from "./display/display";
import OperatorButtons from "./operator-buttons/operator-buttons";
import NumberButtons from "./number-buttons/number-buttons";
import EqualButton from "./equal-button/equal-button";

import { CalculatorElementsName } from "../../const";

import { useAppSelector } from "../../hooks";
import { getCalculatorElements } from "../../store/calculator-construction/selectors";

const CalculatorInConstructor = () => {
  const elementsToRender: string[] = useAppSelector(getCalculatorElements);

  return (
    <div className="calculator-components">
      {elementsToRender.map((element, index) => {
        switch (element) {
          case CalculatorElementsName.Display: {
            return (
              <WrapperCalculatorComponentInConstructor
                key={element}
                order={0}
                id={element}
                children={<Display />}
              />
            );
          }
          case CalculatorElementsName.Equal: {
            return (
              <WrapperCalculatorComponentInConstructor
                key={element}
                order={index}
                id={element}
                children={<EqualButton />}
              />
            );
          }
          case CalculatorElementsName.Operators: {
            return (
              <WrapperCalculatorComponentInConstructor
                key={element}
                order={index}
                id={element}
                children={<OperatorButtons />}
              />
            );
          }
          case CalculatorElementsName.Numbers: {
            return (
              <WrapperCalculatorComponentInConstructor
                key={element}
                order={index}
                id={element}
                children={<NumberButtons />}
              />
            );
          }
        }
      })}
    </div>
  );
};

export default CalculatorInConstructor;
