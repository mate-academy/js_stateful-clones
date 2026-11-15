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

        break;
      case 'removeProperties':
        i.keysToRemove.forEach((k) => {
          delete currentState[k];
        });

        break;
      case 'clear':
        currentState = {};

        break;
      default:
        throw new Error(`Error`);
    }
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
