'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const tempState = { ...state };

  for (const action of actions) {
    if (action['type'] === 'addProperties') {
      Object.keys(action['extraData']).forEach(key => {
        tempState[key] = action['extraData'][key];
      });
    }

    if (action['type'] === 'removeProperties') {
      action['keysToRemove'].forEach(key => {
        delete tempState[key];
      });
    }

    if (action['type'] === 'clear') {
      Object.keys(tempState).forEach(key => {
        delete tempState[key];
      });
    }
    result.push({ ...tempState });
  }

  return result;
}

module.exports = transformStateWithClones;
