
// У каждого компонента должно быть состояние применен ли он уже в конструткоре
import React from "react";
import {useAppDispatch} from "../../hooks";
import {setElement, removeElement} from "../../store/process/process";


let currentDroppable: any = null;
// TODO any remove


const CalculatorComponents = () => {
  const dispatch = useAppDispatch();


  const onMouseDownComponentHandler = (evt: React.MouseEvent) => {
    const currentTarget = evt.currentTarget as HTMLDivElement;
    const draggedDisplay = currentTarget.cloneNode(true) as HTMLElement;

    let shiftX = evt.clientX - currentTarget.getBoundingClientRect().left;
    let shiftY = evt.clientY - currentTarget.getBoundingClientRect().top;

    draggedDisplay.style.width = `${currentTarget.offsetWidth}px`;
    draggedDisplay.style.position = 'absolute';

    currentTarget.classList.add('not-draggable');

    document.body.append(draggedDisplay);

    function moveAt(pageX: number, pageY: number) {
      draggedDisplay.style.left = pageX - shiftX + 'px';
      draggedDisplay.style.top = pageY - shiftY + 'px';
    }

    moveAt(evt.pageX, evt.pageY);

    const onMouseMoveHandler = (evt: MouseEvent) => {
      moveAt(evt.pageX, evt.pageY);

      draggedDisplay.hidden = true;
      let elemBelow = document.elementFromPoint(evt.clientX, evt.clientY);
      draggedDisplay.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.calculator--canvas-empty');

      if (currentDroppable !== droppableBelow) {

        if (currentDroppable) {
          currentDroppable.classList.remove('droppable-canvas--active');
        }
        console.log('outside')
      }

      currentDroppable = droppableBelow;

      if (currentDroppable) {
        if (!currentDroppable.classList.contains('droppable-canvas--active')) {
          currentDroppable.classList.add('droppable-canvas--active');
        }
        console.log('inside')
      }

    };

    document.addEventListener('mousemove', onMouseMoveHandler);

    const onMouseUpHandler = () => {

      console.log(currentDroppable);
      if (currentDroppable) {
        currentDroppable.classList.remove('droppable-canvas--active');
        dispatch(setElement(currentTarget.dataset.id));
      } else {
        dispatch(removeElement(currentTarget.dataset.id));
        currentTarget.classList.remove('not-draggable');
      }


      draggedDisplay.remove();

      document.removeEventListener('mousemove', onMouseMoveHandler);
      draggedDisplay.removeEventListener('mouseup', onMouseUpHandler);
    };

    draggedDisplay.addEventListener('mouseup', onMouseUpHandler);

  };

  return (
      <div className="calculator-components">
          <div className="component-wrapper calculator-components__wrapper" onMouseDown={onMouseDownComponentHandler} data-id="display">
              <p className="display">0</p>
          </div>

          <div className="component-wrapper calculator-components__wrapper" onMouseDown={onMouseDownComponentHandler} data-id="operators">
              <div className="operator-buttons">
                  <button className="operator-buttons__item" type="button">/</button>
                  <button className="operator-buttons__item" type="button">х</button>
                  <button className="operator-buttons__item" type="button">-</button>
                  <button className="operator-buttons__item" type="button">+</button>
              </div>
          </div>

          <div className="component-wrapper calculator-components__wrapper" onMouseDown={onMouseDownComponentHandler} data-id="numbers">
              <div className="number-buttons">
                  <button className="number-buttons__item" type="button">,</button>
                  <button className="number-buttons__item number-buttons__item--long" type="button">0
                  </button>
                  <button className="number-buttons__item" type="button">1</button>
                  <button className="number-buttons__item" type="button">2</button>
                  <button className="number-buttons__item" type="button">3</button>
                  <button className="number-buttons__item" type="button">4</button>
                  <button className="number-buttons__item" type="button">5</button>
                  <button className="number-buttons__item" type="button">6</button>
                  <button className="number-buttons__item" type="button">7</button>
                  <button className="number-buttons__item" type="button">8</button>
                  <button className="number-buttons__item" type="button">9</button>
              </div>
          </div>

          <div className="component-wrapper calculator-components__wrapper" onMouseDown={onMouseDownComponentHandler}  data-id="equal">
              <button className="equal-button" type="button">=</button>
          </div>
      </div>
  );
};

export default CalculatorComponents;
