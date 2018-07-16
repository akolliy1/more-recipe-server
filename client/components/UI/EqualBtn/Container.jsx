import React from 'react';
import EqualBtn from './EqualBtn';

/**
 * @description container for the links
 * @function container
 * @param {*} Empty
 * @returns {JSX} two EqualBtn
 */
const container = () => (
  <div className="row">
    <EqualBtn href="/recipe"> Recipe </EqualBtn>
    <EqualBtn href="/recipe"> Photos </EqualBtn>
  </div>
);

export default container;
