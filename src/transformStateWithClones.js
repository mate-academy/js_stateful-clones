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
    switch (object.type) {
      case 'removeProperties':
        for (const values of object.keysToRemove) {
          delete clone[values];
        }
        break;

      case 'addProperties':
        Object.assign(clone, object.extraData);
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
