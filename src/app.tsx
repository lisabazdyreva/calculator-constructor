import React from "react";

import "./app.css";

import Svg from "./components/svg";
import Switcher from "./components/switcher/switcher";
// import CalculatorContentToDelete from './components/calculator-content/calculator-content';
import CalculatorWrapper from "./components/calculator-wrapper";

const App = () => {
  return (
    <>
      <div className="visually-hidden">
        <Svg />
      </div>

      <main className="main body__main">
        <div className="content-wrapper">
          <Switcher />
          <CalculatorWrapper />
        </div>
      </main>
    </>
  );
};

export default App;
