'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      currentState = {
        ...currentState,
        ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }

    arr.push(currentState);
  }

  return arr;
}

module.exports = transformStateWithClones;
