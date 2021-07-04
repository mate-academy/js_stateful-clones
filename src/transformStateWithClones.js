'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete newState[key];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
