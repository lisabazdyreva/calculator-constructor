export enum NameSpace {
  App = 'APP',
  Canvas = 'CANVAS',
  Calculator = 'CALCULATOR',
}

export const CalculatorElementsName = {
  Display: 'display',
  Operators: 'operators',
  Numbers: 'numbers',
  Equal: 'equal'
} as const;


export const CalculatorMode = {
  Active: 'active',
  Edit: 'edit'
} as const;


export const OperatorsValue = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  None: '',
} as const;
