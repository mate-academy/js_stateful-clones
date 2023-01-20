'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let state2 = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(state2, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete state2[keyToRemove];
      }
    }

    if (action.type === 'clear') {
      state2 = {};
    }

    arr.push({ ...state2 });
  }

  return arr;
}

module.exports = transformStateWithClones;
