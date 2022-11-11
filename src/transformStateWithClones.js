'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const solution = [];
  const copyState = { ...state };

  for (const object of actions) {
    if (object.type === 'addProperties') {
      Object.assign(copyState, object.extraData);
    }

    if (object.type === 'removeProperties') {
      for (const removeKey of object.keysToRemove) {
        delete copyState[removeKey];
      }
    }

    if (object.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }

    solution.push({ ...copyState });
  }

  return solution;
}

module.exports = transformStateWithClones;
