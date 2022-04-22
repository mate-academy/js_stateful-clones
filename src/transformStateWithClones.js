'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = Object.assign({}, state);
  const results = [];

  for (const action of actions) {
    const instruction = action.type;

    if (instruction === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    }

    if (instruction === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (instruction === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    results.push({ ...stateClone });
  }

  return results;
}

module.exports = transformStateWithClones;
