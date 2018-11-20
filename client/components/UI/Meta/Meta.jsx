import React from 'react';
import Aux from '../../../hoc/Auxs/Auxs';

/**
 * @description small image and user's name
 * @function Meta
 * @param {*} Empty
 * @returns {JSX} jsx
 */
const meta = () => (
  <Aux>
    <div className="meta">
      <span className="date mt-2">29 April at 07:29 </span>
    </div>
    <div className="description mt-4">
      <p>Kristy is an art director living in New York.</p>
    </div>
  </Aux>

);

export default meta;
