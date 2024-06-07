'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentCopy = {};
    } else if (action.type === 'addProperties') {
      currentCopy = { ...currentCopy, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentCopy = { ...currentCopy };

      for (const key of action.keysToRemove) {
        delete currentCopy[key];
      }
    }
    stateHistory.push(currentCopy);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
