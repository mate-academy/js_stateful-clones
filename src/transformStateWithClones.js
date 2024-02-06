'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const tempState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(tempState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete tempState[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const ki in tempState) {
        delete tempState[ki];
      }
    }

    result.push({ ...tempState });
  }

  return result;
}

module.exports = transformStateWithClones;
