'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const setOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        break;
    }
    setOfStates.push(currentState);
  }

  return setOfStates;
}

module.exports = transformStateWithClones;
