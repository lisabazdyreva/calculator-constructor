import {CalculatorElementsNameType} from "../../types/state";

interface SimpleWrapperProps {
  children: JSX.Element,
  disabled: boolean,
  id: CalculatorElementsNameType,
}

const SimpleWrapper = ({children, disabled, id}: SimpleWrapperProps) => {
  return (
    <div className={`component-wrapper calculator-components__wrapper ${disabled ? 'not-draggable' : ''}`}
         draggable={!disabled} data-id={id}>
      {children}
    </div>
  );
};

export default SimpleWrapper;
