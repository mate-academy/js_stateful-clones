'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultState = [ { ...state } ];

  for (const i in actions) {
    if (i > 0) {
      resultState[i] = { ...resultState[i - 1] };
    }

    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        resultState[i][key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const key in actions[i].keysToRemove) {
        delete resultState[i][actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      resultState[i] = {};
    }
  }

  return resultState;
}

module.exports = transformStateWithClones;
