'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let state2 = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const extra in action.extraData) {
        state2[extra] = action.extraData[extra];
      }
    }

    if (action.type === 'removeProperties') {
      for (const toRemove of action.keysToRemove) {
        delete state2[toRemove];
      }
    }

    if (action.type === 'clear') {
      state2 = {};
    }

    result.push({ ...state2 });
  }

  return result;
}

module.exports = transformStateWithClones;
