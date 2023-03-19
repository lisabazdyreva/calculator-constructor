import React, {useState} from 'react';
import {CalculatorElementsName} from '../const';
import {CalculatorElementsNameType} from '../types/state';
import {replaceElement, setElement} from '../store/canvas/canvas';
import {useAppDispatch} from './index';


export const useDrag = () => {
  const dispatch = useAppDispatch();

  const [idPreSet, setIdPreSet] = useState<CalculatorElementsNameType | null>(null);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [cursorPositionStart, setStartPosition] = useState(0);
  const [positionElement, setPositionElement] = useState<HTMLElement | null>(null);

  const setElementId = (id: CalculatorElementsNameType) => {
    setIdPreSet(id);
  };

  const onDragStart = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;

    if (target.dataset.id) {
      setActiveElement(target);
    }
  };

  const onDragEnter = (evt: React.DragEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;
    if (target.dataset.id) {
      setStartPosition(evt.pageY);
    }
  };

  const onDragLeave = (evt: React.DragEvent) => {
    evt.preventDefault();

    const currentTarget = evt.currentTarget as HTMLElement;
    const target = evt.target as HTMLElement;

    if (currentTarget.classList.contains('droppable-canvas--active')) {
      currentTarget.classList.remove('droppable-canvas--active')
    }

    if (currentTarget.children[0].children[1].classList.contains('calculator-components') && currentTarget.children[0].children[1].children.length) {
      currentTarget.children[0].children[1].children[currentTarget.children[0].children[1].children.length - 1].classList.remove('border-bottom');

    }

    if (target.dataset.id) {
      target.classList.remove('border-bottom');
    }

  };



  const onDragOver = (evt: React.DragEvent) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    if (idPreSet) {
      if (target.classList.contains('calculator--canvas-empty')) {
        target.classList.add('droppable-canvas--active')
      }

      if (target.classList.contains('calculator-components')) {
        target.children[target.children.length - 1].classList.add('border-bottom');
      }
    }
    //    if (activeElement && target.dataset.id === CalculatorElementsName.Display) {
    if (target.dataset.id === CalculatorElementsName.Display) {
      target.classList.add('border-bottom');
      setPositionElement(target);
    }
    // if (activeElement && target.dataset.id !== CalculatorElementsName.Display && target.dataset.id) {

    if (target.dataset.id !== CalculatorElementsName.Display && target.dataset.id) {

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
  };

  const onDrop = (evt: React.DragEvent) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    console.log(idPreSet)

    if (idPreSet) {

      if (positionElement) {
        dispatch(setElement({element: idPreSet, place: positionElement.dataset.id}));
      } else {
        dispatch(setElement({element: idPreSet}));
      }

      setIdPreSet(null);

      if (target.classList.contains('calculator-components')) {
        target.children[target.children.length - 1].classList.remove('border-bottom');
      }

      if (target.dataset.id) {
        target.classList.remove('border-bottom');
      }
    } else {

      if (activeElement && positionElement && activeElement !== positionElement) {
        const activeElementId = activeElement.dataset.id as CalculatorElementsNameType;
        const elementToReplaceId = positionElement.dataset.id as CalculatorElementsNameType;

        dispatch(replaceElement({activeElementId, elementToReplaceId}));
      }
      setActiveElement(null);
    }

    // if (activeElement) {


    if (target.classList.contains('border-bottom')) {
      target.classList.remove('border-bottom');
    }

    if (target.classList.contains('border-top')) {
      target.classList.remove('border-top');
    }

    setPositionElement(null);

  };


  return {
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    setElementId
  };
};

