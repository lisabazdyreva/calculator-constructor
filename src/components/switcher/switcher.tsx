import {useAppDispatch} from "../../hooks";
import {ChangeEvent} from "react";
import {setDisplayMode} from "../../store/process/process";
import {resetDisplay} from '../../store/calculations/calculations';

const Switcher = () => {

    const dispatch = useAppDispatch();

    const onChangeDisplayModeHandler = (evt: ChangeEvent) => {
        const target = evt.target as HTMLInputElement;
        const value = target.dataset.value;

        dispatch(setDisplayMode(value));
        dispatch(resetDisplay());
    };

    return (
        <div className="switcher main__switcher">
            <div className="switcher__buttons">

                <input onChange={onChangeDisplayModeHandler} className="switcher__input" id="display-active" name="display-mode" type="radio"
                       data-value="active" />
                <label className="switcher__button" htmlFor="display-active">
                    <svg className="switcher__icon" width="20" height="20" aria-hidden="true">
                        <use xlinkHref="#eye-icon"></use>
                    </svg>
                    <span>Runtime</span>
                </label>

                <input onChange={onChangeDisplayModeHandler} className="switcher__input" id="display-edit" name="display-mode" type="radio"
                       data-value="edit" defaultChecked/>
                <label className="switcher__button" htmlFor="display-edit">
                    <svg className="switcher__icon" width="20" height="20" aria-hidden="true">
                        <use xlinkHref="#brackets-icon"></use>
                    </svg>
                    <span>Constructor</span>
                </label>
            </div>
        </div>
    );
};

export default Switcher;
