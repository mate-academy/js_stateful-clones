/* eslint-disable no-console */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const clones = [];

  let act = false;

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      act = true;
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
      act = true;
    }

    if (action.type === 'clear') {
      Object.keys(clone).forEach((key) => delete clone[key]);
      act = true;
    }

    const newState = { ...clone };

    if (act) {
      clones.push(newState);
    }
  }

  return clones;
}

module.exports = transformStateWithClones;
