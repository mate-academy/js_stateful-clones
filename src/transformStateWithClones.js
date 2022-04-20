'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const results = [];

  for (const act of actions) {
    if (act.type === 'addProperties') {
      Object.assign(newState, act.extraData);
    } else if (act.type === 'removeProperties') {
      for (const i of act.keysToRemove) {
        delete newState[i];
      }
    } else {
      for (const key in newState) {
        delete newState[key];
      }
    }
    results.push({ ...newState });
  }

  return results;
}

module.exports = transformStateWithClones;
