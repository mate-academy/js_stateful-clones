'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, action) {
  let currentState = { ...state };
  const stateHistory = [];

  action.forEach((i) => {
    switch (i.type) {
      case 'addProperties':
        currentState = { ...currentState, ...i.extraData };
        stateHistory.push({ ...currentState });
        break;
      case 'removeProperties':
        i.keysToRemove.forEach((k) => {
          delete currentState[k];
        });
        stateHistory.push({ ...currentState });

        break;
      case 'clear':
        currentState = {};
        stateHistory.push(currentState);
        break;
      default:
        throw new Error(`Error`);
    }
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
