'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete newState[key];
      }
    } else if (actions[i].type === 'clear') {
      for (const key1 in newState) {
        delete newState[key1];
      }
    }
    res.push({ ...newState });
  }

  return res;
}

module.exports = transformStateWithClones;
