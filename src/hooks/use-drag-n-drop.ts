import React, {useState} from 'react';

import {CalculatorElementsName} from '../const';
import {CalculatorElementsNameType} from '../types/state';
import {replaceElement, setElement, setElementById} from '../store/canvas/canvas';

import {useAppDispatch, useAppSelector} from './index';
import {getCalculatorElements} from "../store/canvas/selectors";


export const useDragNDrop = () => {
  const dispatch = useAppDispatch();

  const elementsInCalculator = useAppSelector(getCalculatorElements);

  const [elementIdToAddInCalculator, setElementIdToAddInCalculator] = useState<CalculatorElementsNameType | null>(null);
  const [changingPositionElement, setChangingPositionElement] = useState<HTMLElement | null>(null); // элемент, который хочет изменить своё местоположение
  const [newPositionElement, setNewPositionElement] = useState<HTMLElement | null>(null);

  const [cursorPositionStart, setCursorPositionStart] = useState(0); // мб еще как использовать?


  // устанавливаем значение id для нового перетаскивемого в активную область элемента
  const setElementId = (id: CalculatorElementsNameType) => {
    setElementIdToAddInCalculator(id);
  };

  const clearBorders = (parentElement: Element) => {
    parentElement.childNodes.forEach((child) => {
      const element = child as HTMLElement;

      element.classList.remove('border-bottom');
      element.classList.remove('border-top')
    });
  };

  const addTopBorder = (element: HTMLElement) => {
    element.classList.add('border-top')
    element.classList.remove('border-bottom');
  };

  const addBottomBorder = (element: HTMLElement) => {
    element.classList.add('border-bottom');
    element.classList.remove('border-top');
  };

  const setBorderOnHalfElement = (element: HTMLElement, positionY: number) => {
    // from down
    if (cursorPositionStart - positionY - element.clientHeight / 2 > 0) {
      if (element !== changingPositionElement) {
        addTopBorder(element);
      }
      setNewPositionElement(element);
    } else if (cursorPositionStart - positionY > 0) {
      if (element !== changingPositionElement) {
        addBottomBorder(element);
      }
    }

    //  from up
    if (cursorPositionStart - positionY + element.clientHeight / 2 < 0) {
      if (changingPositionElement !== element) {
        addBottomBorder(element);
      }
      setNewPositionElement(element);
    } else if (cursorPositionStart - positionY < 0) {
      if (element !== changingPositionElement) {
        addTopBorder(element);
      }
    }
  };
  // когда начинаем менять позицию уже добавленного элемента и тянуть, то устанавливаем элемент, который тянем
  const onDragStart = (evt: React.DragEvent) => {
    const target = evt.target as HTMLElement;

    if (target.dataset.id) {
      setChangingPositionElement(target);
    }
  };

  //когда заходим в элемент, от которого можем посчитать позицию, устанавливаем значение позиции
  //оба элемента: и новый, и петесакиваемый
  const onDragEnter = (evt: React.DragEvent) => {
    evt.preventDefault();

    const target = evt.target as HTMLElement;

    if (target.dataset.id) {
      setCursorPositionStart(evt.pageY);
    }
  };

  //когда выходим из элемента, от которого считали позицию, убираем border
  //оба элемента: и новый, и петесакиваемый
  const onDragLeave = (evt: React.DragEvent) => {
    evt.preventDefault();

    const currentTarget = evt.currentTarget as HTMLElement;

    const calculatorWrapper = currentTarget.children[0];
    const elementsWrapper = currentTarget.children[0].children[1];

    if (calculatorWrapper.classList.contains('droppable-canvas--active')) {
      calculatorWrapper.classList.remove('droppable-canvas--active');
    }

    clearBorders(elementsWrapper);
  };


  // когда переносим жлемент внутри канваса
  const onDragOver = (evt: React.DragEvent) => {
    evt.preventDefault();
    const target = evt.target as HTMLElement;

    // добавляем цвет для пустого канваса
    if (elementIdToAddInCalculator) {
      if (target.classList.contains('calculator--canvas-empty')) {
        target.classList.add('droppable-canvas--active')
      }
    }

    // добавляем нижнюю границу, если находимся в зоне добавления на последнем элементе
    if (target.classList.contains('calculator-components') && target.children.length) {
      const lastElement = elementsInCalculator[elementsInCalculator.length - 1];

      target.childNodes.forEach((child) => {
        const elem = child as HTMLElement;

        if (elem.dataset.id === lastElement && changingPositionElement?.dataset.id !== lastElement) {
          elem.classList.add('border-bottom')
        }
      })
    }

    //добавляем для дисплея только нижнюю границу
    if (target.dataset.id === CalculatorElementsName.Display) {
      target.classList.add('border-bottom');
      setNewPositionElement(target);
    }

    if (target.dataset.id !== CalculatorElementsName.Display && target.dataset.id) {
      setBorderOnHalfElement(target, evt.pageY);
    }
  };

  //когда устанавливаем позицию элементу в списке или добавляем просто
  //оба элемента: и новый, и петесакиваемый
  const onDrop = (evt: React.DragEvent) => {
    evt.preventDefault();
    const currentTarget = evt.currentTarget as HTMLElement;
    const target = evt.target as HTMLElement;

    if (elementIdToAddInCalculator) {
      if (newPositionElement) {
        dispatch(setElementById({element: elementIdToAddInCalculator, place: newPositionElement.dataset.id}));
      } else {
        dispatch(setElement(elementIdToAddInCalculator));
      }

      setElementIdToAddInCalculator(null);

      if (target.classList.contains('calculator-components') && target.children.length) {
        target.children[target.children.length - 1].classList.remove('border-bottom');
      }

    } else {

      if (changingPositionElement && newPositionElement && changingPositionElement !== newPositionElement) {
        const changingPositionElementId = changingPositionElement.dataset.id as CalculatorElementsNameType;
        const relativePositionElementId = newPositionElement.dataset.id as CalculatorElementsNameType;

        dispatch(replaceElement({activeElementId: changingPositionElementId, elementToReplaceId: relativePositionElementId }));
      }
      setChangingPositionElement(null);
    }

    const elementsWrapper = currentTarget.children[0].children[1];
    clearBorders(elementsWrapper);

    setNewPositionElement(null);

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

