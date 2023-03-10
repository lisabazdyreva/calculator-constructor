export const getDisplayMode = (state: any): string => state.AppProcess.calculatorDisplayMode;
export const getCanvasDisplayMode = (state: any): string => state.AppProcess.canvasDisplayMode;

export const getDraggablePosition = (state: any): boolean => state.AppProcess.isDraggableInsideCanvas;
    //TODO Убрать any
export const getCalculatorElements = (state: any): string[] | [] => state.AppProcess.elementsInCalculator;
