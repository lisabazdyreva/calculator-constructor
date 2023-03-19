import React from "react";
import { useAppSelector } from "../../../hooks";

import { getDisplay } from "../../../store/calculations/selectors";

const Display = () => {
  const displayValue = useAppSelector(getDisplay);

  return (
    <p
      className="display"
      style={{
        fontSize: `${36 - displayValue.length}px`,
        pointerEvents: "none",
      }}
    >
      {displayValue}
    </p>
  );
};

export default Display;
