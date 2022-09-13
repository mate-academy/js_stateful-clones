'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const type of actions) {
    if (type['type'] === 'addProperties') {
      for (const property in type['extraData']) {
        clone[property] = type['extraData'][property];
      }
    }

    if (type['type'] === 'removeProperties') {
      for (const property of type['keysToRemove']) {
        delete clone[property];
      }
    }

    if (type['type'] === 'clear') {
      for (const key in clone) {
        delete clone[key];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
