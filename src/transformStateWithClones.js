'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const statesHistory = [];

  for (const { type, extraData, keysToRemove } of actions) {

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }

    statesHistory.push({ ...currentState });
  }

  return statesHistory;
}

module.exports = transformStateWithClones;

module.exports = transformStateWithClones;
