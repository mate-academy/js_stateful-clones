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
  const currentState = { ...state };

  for (const action of actions) {
    const type = action.type;

    switch (type) {
      case 'addProperties':
        for (const data in action.extraData) {
          currentState[data] = action.extraData[data];
        }
        break;
      case 'removeProperties':
        for (const data of action.keysToRemove) {
          delete currentState[data];
        }
        break;
      case 'clear':
        Object.keys(currentState).forEach((key) => {
          delete currentState[key];
        });
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
