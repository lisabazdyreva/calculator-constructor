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

export const SwitcherIcon = {
  Active: 'eye-icon',
  Edit: 'brackets-icon',
} as const;

export const SwitcherTitle = {
  Active: 'Runtime',
  Edit: 'Constructor',
} as const;


export const OperatorsValue = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  None: '',
} as const;


export const DIVIDE_NULL_MESSAGE = 'Не определено';

export const BIG_NUMBER = 'Не поддерживаем';
export const MAX_OPERAND_LENGTH = 15;
