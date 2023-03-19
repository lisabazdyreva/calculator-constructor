import React from 'react';

import './app.css';

import Svg from "./components/svg";
import Switcher from "./components/switcher";
// import CalculatorContentToDelete from './components/calculator-content/calculator-content';
import CalculatorContentNew from "./components/new-calculator-content/calculator-content-new";

const App = () => {
  return (
      <>
          <div className="visually-hidden">
              <Svg />
          </div>

          <main className="main body__main">
              <div className="content-wrapper">
                <Switcher />
                <CalculatorContentNew />
              </div>
          </main>
      </>
  );
}

export default App;
