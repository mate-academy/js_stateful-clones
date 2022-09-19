'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = Object.assign({}, state);
  const allStates = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete currentState[keyToRemove];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    allStates.push({ ...currentState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
