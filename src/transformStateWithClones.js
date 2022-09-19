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
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    allStates.push({ ...currentState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
