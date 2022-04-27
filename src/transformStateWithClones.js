'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const object of actions) {
    if (object.type === 'removeProperties') {
      for (const values of object.keysToRemove) {
        delete clone[values];
      }
    }

    if (object.type === 'addProperties') {
      for (const pair in object.extraData) {
        clone[pair] = object.extraData[pair];
      }
    }

    if (object.type === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
