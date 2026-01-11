'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let currentState = state;

  for (const action of actions) {
    const clone = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    stateArray.push(clone);
    currentState = clone;
  }

  return stateArray;
}

module.exports = transformStateWithClones;
