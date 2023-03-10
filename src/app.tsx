import './app.css';

import Svg from "./components/svg";
import Switcher from "./components/switcher/switcher";
import CalculatorComponents from "./components/calculator-components/calculator-components";
import DropArea from "./components/drop-area/drop-area";
import {useAppSelector} from "./hooks";
import {
  getCalculatorElements,
  getCanvasDisplayMode,
  getDisplayMode,
  getDraggablePosition
} from "./store/process/selectors";
import CalculatorComponentsCanvas from "./components/calculator-components/calculator-components-canvas";


const App = () => {
  const calculatorMode = useAppSelector(getDisplayMode);
  const isInsideDrop = useAppSelector(getDraggablePosition);
  const calculatorElements = useAppSelector(getCalculatorElements);
  const isCanvasEmpty = useAppSelector(getCanvasDisplayMode);

  return (
      <>
          <div className="visually-hidden">
              <Svg />
          </div>

          <main className="main body__main">
              <div className="content-wrapper">
                  <Switcher />

                  <div className="calculator-content main__calculator-content">{/* <!-- todo calculator-content--active calculator-content--edit-->*/}
                        <CalculatorComponents/>
                      <div className="calculator-wrapper">
                          <div className={`calculator ${calculatorMode === 'active' && 'calculator--active'} ${calculatorMode === 'edit' && !calculatorElements.length ? 'calculator--canvas-empty' : ''}  ${calculatorMode === 'edit' && calculatorElements.length ? 'calculator--canvas-full' : ''}`}>{/*<!-- calculator--canvas-full calculator--canvas-empty  -->*/}
                              <DropArea />
                              <CalculatorComponentsCanvas elementsToRender={calculatorElements}/>
                          </div>
                      </div>
                  </div>
              </div>
          </main>
      </>
  );
}

export default App;
