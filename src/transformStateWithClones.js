'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key in action.keysToRemove) {
        delete stateCopy[key];
      }
    } else if (action.type === 'clear') {
      for (const key of Object.keys(stateCopy)) {
        delete stateCopy[key];
      }
    }

    stateHistory.push(stateCopy);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
