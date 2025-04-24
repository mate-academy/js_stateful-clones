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
    const stateClone = { ...state2 };

    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
      result.push(stateClone);
      state2 = stateClone;
      continue;
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    result.push(stateClone);
    state2 = stateClone;
  }

  return result;
}

module.exports = transformStateWithClones;
