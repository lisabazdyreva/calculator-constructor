import React from 'react';
import {useAppSelector} from '../../hooks';
import {getDisplayMode} from '../../store/process/selectors';
import {getDisplay} from '../../store/calculations/selectors';

interface DisplayProps {
  order?: number,
  disabled?: boolean
  onDoubleClickHandler?: (evt: React.MouseEvent) => void,
  setCurrentElement?: (element: React.DragEvent) => void,
}


const Display = ({order, disabled, onDoubleClickHandler, setCurrentElement}: DisplayProps) => {
  const calculatorMode = useAppSelector(getDisplayMode);

  const displayValue = useAppSelector(getDisplay);


  const onDragStartHandler = (evt: React.DragEvent) => {
    if (disabled || order === 0 || calculatorMode === 'active') {
      evt.preventDefault();
    }
    if (setCurrentElement) {
      setCurrentElement(evt);
    }

  };

  // const onDragOverHandler = (evt: React.DragEvent) => {
  //   if (order) {
  //     evt.preventDefault();
  //   }
  // };

  const onDoubleClickComponentHandler = (evt: React.MouseEvent) => {
    if (onDoubleClickHandler) {
      onDoubleClickHandler(evt);
    }
  };

  return (
      <div
        className={`component-wrapper calculator-components__wrapper ${disabled ? 'not-draggable' : ''}`}
        draggable={true}
        onDoubleClick={onDoubleClickComponentHandler}
        onDragStart={onDragStartHandler}
        data-id="display"
        style={{order: order}}
      >
        <p className="display">{calculatorMode === 'active' && order === 0 ? displayValue : 0}</p>
      </div>
  );
};

export default Display;
