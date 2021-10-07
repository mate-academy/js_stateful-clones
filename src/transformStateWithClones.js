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

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const removeKey of keysToRemove) {
          delete clone[removeKey];
        }
        break;

      case 'clear':
        for (const prop in clone) {
          delete clone[prop];
        }
        break;

      default:
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
