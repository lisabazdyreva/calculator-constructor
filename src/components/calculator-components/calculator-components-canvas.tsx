import React from "react";
import CalculatorComponents from "./calculator-components";

interface CalculatorComponentsProps {
  elementsToRender?: string[] | [],
}


const CalculatorComponentsCanvas = ({elementsToRender}: CalculatorComponentsProps ) => {
  let rendered = '';
  if (elementsToRender) {
    elementsToRender.forEach((elem) => {
      switch (elem) {
        case 'display': {
          rendered += <div className="component-wrapper calculator-components__wrapper">
            <p className="display">0</p>
          </div>;
          break;
        }
        case 'operators' : {
          rendered +=  <div className="component-wrapper calculator-components__wrapper">
            <div className="operator-buttons">
              <button className="operator-buttons__item" type="button">/</button>
              <button className="operator-buttons__item" type="button">х</button>
              <button className="operator-buttons__item" type="button">-</button>
              <button className="operator-buttons__item" type="button">+</button>
            </div>
          </div>;
          break;
        }
        default: {
          rendered += `<div>Ничего не выбрано</div>`
        }
      }
    });
  }

  return (
    <div className="calculator-components">
      {elementsToRender && <CalculatorComponents />}
      {/*<div className="component-wrapper calculator-components__wrapper">*/}
      {/*  <p className="display">0</p>*/}
      {/*</div>*/}

      {/*<div className="component-wrapper calculator-components__wrapper">*/}
      {/*  <div className="operator-buttons">*/}
      {/*    <button className="operator-buttons__item" type="button">/</button>*/}
      {/*    <button className="operator-buttons__item" type="button">х</button>*/}
      {/*    <button className="operator-buttons__item" type="button">-</button>*/}
      {/*    <button className="operator-buttons__item" type="button">+</button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="component-wrapper calculator-components__wrapper">*/}
      {/*  <div className="number-buttons">*/}
      {/*    <button className="number-buttons__item" type="button">,</button>*/}
      {/*    <button className="number-buttons__item number-buttons__item--long" type="button">0*/}
      {/*    </button>*/}
      {/*    <button className="number-buttons__item" type="button">1</button>*/}
      {/*    <button className="number-buttons__item" type="button">2</button>*/}
      {/*    <button className="number-buttons__item" type="button">3</button>*/}
      {/*    <button className="number-buttons__item" type="button">4</button>*/}
      {/*    <button className="number-buttons__item" type="button">5</button>*/}
      {/*    <button className="number-buttons__item" type="button">6</button>*/}
      {/*    <button className="number-buttons__item" type="button">7</button>*/}
      {/*    <button className="number-buttons__item" type="button">8</button>*/}
      {/*    <button className="number-buttons__item" type="button">9</button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="component-wrapper calculator-components__wrapper">*/}
      {/*  <button className="equal-button" type="button">=</button>*/}
      {/*</div>*/}
    </div>
  );
};

export default CalculatorComponentsCanvas;
