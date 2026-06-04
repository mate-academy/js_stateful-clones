'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const currentState = { ...copyState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      default:
        break;
    }
    stateHistory.push(currentState);
    copyState = currentState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;