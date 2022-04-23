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
  const copyState = { ...state };

  for (const i in actions) {
    if (actions[i].type === 'addProperties') {
      Object.assign(copyState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete copyState[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
