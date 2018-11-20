import React from 'react';

/**
 * @description input Checkbox
 * @function inputCheckbox
 * @param {*} props
 * @returns {JSX} jsx
 */
const inputCheckbox = props => (
  <div className="field">
    {/* eslint-disable */}
    <label>
        <input className="uk-checkbox" type="checkbox" checked={props.checked} required />
         By clicking Means you agreed to our terms and Conditions
    </label>
    {/* eslint-enable */}
  </div>
);

export default inputCheckbox;
