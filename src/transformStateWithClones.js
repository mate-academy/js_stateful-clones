'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];

  for (let i = 0; i < actions.length; i++) {
    if (i === 0) {
      resultStates.push(
        {
          ...state,
        }
      );
    } else {
      resultStates.push(
        {
          ...resultStates[i - 1],
        }
      );
    }

    if (actions[i].type === 'addProperties') {
      Object.assign(resultStates[i], actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete resultStates[i][key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in resultStates[i]) {
        delete resultStates[i][key];
      }
    }
  }

  return resultStates;
}

module.exports = transformStateWithClones;
