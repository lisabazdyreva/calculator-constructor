import React from 'react';

import './app.css';

import Svg from "./components/svg";
import Switcher from "./components/switcher/switcher";
import CalculatorContent from './components/calculator-content/calculator-content';


const App = () => {
  return (
      <>
          <div className="visually-hidden">
              <Svg />
          </div>

          <main className="main body__main">
              <div className="content-wrapper">
                <Switcher />
                <CalculatorContent />
              </div>
          </main>
      </>
  );
}

export default App;
