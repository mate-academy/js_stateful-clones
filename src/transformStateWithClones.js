'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let currentState = { ...state };

  actions.forEach(action => {
    currentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }
        break;

      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error('Error');
    }

    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
