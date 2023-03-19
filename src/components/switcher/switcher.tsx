import {ChangeEvent} from "react";

import {useAppDispatch} from "../../hooks";

import {setCalculatorDisplayMode} from "../../store/process/process";
import {resetDisplay} from '../../store/calculations/calculations';
import {CalculatorMode, SwitcherIcon, SwitcherTitle} from "../../const";
import SwitchButton from "./switch-button";


export type DataType = {
  title: string,
  mode: string,
  icon: string
};

export type SwitchDataType = {
  [prop: string] : DataType,
}

const Switcher = () => {
  const getSwitcherData = () => {
    const result: SwitchDataType = {};

    const switcherIcons = Object.values(SwitcherIcon);
    const switcherTitles = Object.values(SwitcherTitle);
    const calculatorModes = Object.values(CalculatorMode);
    const calculatorKeys = Object.keys(CalculatorMode);

    calculatorKeys.forEach((key, index) => {

      result[key] = {
        title: switcherTitles[index],
        mode: calculatorModes[index],
        icon: switcherIcons[index],
      };
    });

    return result;

  };

  const switcherData = getSwitcherData();

  const dispatch = useAppDispatch();

  const onChangeDisplayModeHandler = (evt: ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const value = target.dataset.value;

    dispatch(setCalculatorDisplayMode(value));
    dispatch(resetDisplay());
  };

  return (
    <div className="switcher main__switcher">
      <div className="switcher__buttons">
        {Object.keys(CalculatorMode).map((mode) => {
          const data = switcherData[mode];
          return <SwitchButton key={mode} onChangeDisplayModeHandler={onChangeDisplayModeHandler} data={data}/>
        })}
      </div>
    </div>
  );
};

export default Switcher;
