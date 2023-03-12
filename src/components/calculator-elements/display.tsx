import React from 'react';
import {useAppSelector} from '../../hooks';

import {getDisplay} from '../../store/calculations/selectors';


const Display = () => {
  const displayValue = useAppSelector(getDisplay);

  return (
    <p className="display">{displayValue}</p>
  );
};

export default Display;
