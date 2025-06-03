'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = { ...state };
  const solution = [];

  for (const object of actions) {
    if (object.type === 'addProperties') {
      for (const key in object.extraData) {
        result[key] = object.extraData[key];
      }
    } else if (object.type === 'removeProperties') {
      for (const i of object.keysToRemove) {
        delete result[i];
      }
    } else if (object.type === 'clear') {
      for (const key in result) {
        delete result[key];
      }
    }
    solution.push({ ...result });
  }

  return solution;
}

module.exports = transformStateWithClones;
