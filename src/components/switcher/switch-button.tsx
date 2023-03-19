import { ChangeEvent } from "react";

import { DataType } from "./switcher";

import { useAppSelector } from "../../hooks";
import { getCalculatorDisplayMode } from "../../store/process/selectors";

interface ISwitchButton {
  onChangeDisplayModeHandler: (evt: ChangeEvent) => void;
  data: DataType;
}

const SwitchButton = ({ onChangeDisplayModeHandler, data }: ISwitchButton) => {
  const id = `display-${data.mode}`;
  const calculatorMode = useAppSelector(getCalculatorDisplayMode);

  const onChangeInputHandler = (evt: ChangeEvent) => {
    onChangeDisplayModeHandler(evt);
  };

  return (
    <>
      <input
        onChange={onChangeInputHandler}
        className="switcher__input visually-hidden"
        id={id}
        name={`${data.mode}-mode`}
        type="radio"
        data-value={data.mode}
        checked={calculatorMode === data.mode}
      />
      <label className="switcher__button" htmlFor={id}>
        <svg
          className="switcher__icon"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <use xlinkHref={`#${data.icon}`}></use>
        </svg>
        <span>{`${data.title}`}</span>
      </label>
    </>
  );
};

export default SwitchButton;
