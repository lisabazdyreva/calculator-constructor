import CalculatorComponents from "../calculator-content/calculator-components";
import DropArea from "../drop-area";
import CalculatorConstructor from "../calculator-content/calculator-constructor";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {getCalculatorDisplayMode} from "../../store/process/selectors";
import {getCalculatorElements} from "../../store/canvas/selectors";
import {CalculatorElementsName, CalculatorMode} from "../../const";
import {CalculatorElementsNameType} from "../../types/state";
import {replaceElement, setElement} from "../../store/canvas/canvas";

const CalculatorContentNew = () => {
  const dispatch = useAppDispatch();
  let idPreSet: CalculatorElementsNameType | null;
  // let cursorPositionStart: number;

  const calculatorDisplayMode = useAppSelector(getCalculatorDisplayMode);
  const calculatorElements = useAppSelector(getCalculatorElements);

  const setElementId = (id: CalculatorElementsNameType) => {
    idPreSet = id;
  };

  // const elementsToRender: string[] = useAppSelector(getCalculatorElements);
  // const dispatch = useAppDispatch();
  //
  const [cursorPositionStart, setStartPosition] = useState(0);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [positionElement, setPositionElement] = useState<HTMLElement | null>(null);
  //
  // let positionElement: HTMLElement;


  const onCalculatorDragStart = (evt: React.DragEvent) => {
    // evt.preventDefault();
    const target = evt.target as HTMLElement;
    console.log(evt.pageY);
    // cursorPositionStart = evt.pageY;
    console.log('hi');
    if (target.dataset.id) {
      setActiveElement(target);
    }
  };

  // const onCalculatorDropHandler = (evt: React.DragEvent) => {
  //   if (activeElement && positionElement && activeElement !== positionElement) {
  //     const activeElementId = activeElement.dataset.id as CalculatorElementsNameType;
  //     const elementToReplaceId = positionElement.dataset.id as CalculatorElementsNameType;
  //
  //     dispatch(replaceElement({activeElementId, elementToReplaceId}));
  //   }
  //
  //   if (activeElement) {
  //     const target = evt.target as HTMLElement;
  //
  //     if (target.classList.contains('border-bottom')) {
  //       target.classList.remove('border-bottom');
  //     }
  //
  //     if (target.classList.contains('border-top')) {
  //       target.classList.remove('border-top');
  //     }
  //   }
  //   setActiveElement(null);
  // };

  // const setPositionElement = (element: HTMLElement) => {
  //   positionElement = element;
  // };

  const onDragEnterHandler = (evt: React.DragEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;
    if (target.dataset.id) {
      setStartPosition(evt.pageY);
    }
  };

  const onDragLeaveHandler = (evt: React.DragEvent) => {
    evt.preventDefault();

    const currentTarget = evt.currentTarget as HTMLElement;
    const target = evt.target as HTMLElement;

    if (currentTarget.classList.contains('droppable-canvas--active')) {
      currentTarget.classList.remove('droppable-canvas--active')
    }

    // if (target.classList.contains('border-top'))


    // if (currentTarget.classList.contains('calculator--canvas-full')) {
    //   const wrapper = currentTarget.children[currentTarget.children.length - 1];
    //   removeBorder(wrapper.children[wrapper.children.length - 1]);
    // }


  };

  const onDragOverHandler = (evt: React.DragEvent) => {
    evt.preventDefault();

    if (idPreSet) {
      const target = evt.target as HTMLElement;

      if (target.classList.contains('calculator--canvas-empty')) {
        target.classList.add('droppable-canvas--active')
      }


      if (target.classList.contains('calculator-components')) {
        target.children[target.children.length - 1].classList.add('border-bottom');
      }

    } else {
      let target = evt.target as HTMLElement;

      if (activeElement && target.dataset.id === CalculatorElementsName.Display) {
        target.classList.add('border-bottom');
        setPositionElement(target);
      }

      if (activeElement && target.dataset.id !== CalculatorElementsName.Display && target.dataset.id) {

        // from down
        if (cursorPositionStart - evt.pageY - target.clientHeight / 2 > 0) {
          if (target !== activeElement) {
            target.classList.remove('border-bottom')
            target.classList.add('border-top')
          }
          setPositionElement(target);
        } else if (cursorPositionStart - evt.pageY > 0) {

          if (target !== activeElement) {
            target.classList.add('border-bottom');
            target.classList.remove('border-top');
          }
        }

        //  from up
        if (cursorPositionStart - evt.pageY + target.clientHeight / 2 < 0) {

          if (activeElement !== target) {
            target.classList.add('border-bottom');
            target.classList.remove('border-top');
          }
          setPositionElement(target);
        } else if (cursorPositionStart - evt.pageY < 0) {
          if (target !== activeElement) {
            target.classList.remove('border-bottom');
            target.classList.add('border-top');
          }

        }
      }
    }



  };
  //
  const onDropHandler = (evt: React.DragEvent) => {
    evt.preventDefault();


    const currentTarget = evt.currentTarget as HTMLElement;
    //
    if (idPreSet) {
      evt.preventDefault();

      // if (currentTarget.classList.contains('calculator--canvas-full')) {
      //   const wrapper = currentTarget.children[currentTarget.children.length - 1];
      //   removeBorder(wrapper.children[wrapper.children.length - 1]);
      // }

      dispatch(setElement(idPreSet));
      idPreSet = null;
    }

  };


  const activeClass = calculatorDisplayMode === CalculatorMode.Active ? ' calculator--active ' : '';
  const editEmptyClass = calculatorDisplayMode === CalculatorMode.Edit && !calculatorElements.length ? ' calculator--canvas-empty ' : '';
  const editFullClass = calculatorDisplayMode === CalculatorMode.Edit && calculatorElements.length ? ' calculator--canvas-full ' : '';

  const calculatorClassname = `calculator${activeClass}${editEmptyClass}${editFullClass}`;

  return (
    <div className="calculator-content main__calculator-content">
      <CalculatorComponents setElementId={setElementId}/>
      <div className="calculator-wrapper" onDragEnter={onDragEnterHandler} onDragLeave={onDragLeaveHandler} onDragStart={onCalculatorDragStart} onDragOver={onDragOverHandler} onDrop={onDropHandler}> {/*onDragLeave={}*/}
        <div className={calculatorClassname}>
          <DropArea />
          <CalculatorConstructor/>
        </div>
      </div>
    </div>
  );
};

export default CalculatorContentNew;
