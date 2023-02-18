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

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties':
        for (const key in value.extraData) {
          clone[key] = value.extraData[key];
        }
        result.push({ ...clone });
        break;

      case 'removeProperties':
        for (const key of value.keysToRemove) {
          if (key in clone) {
            delete clone[key];
          }
        }
        result.push({ ...clone });
        break;

      default:
        for (const key in clone) {
          delete clone[key];
        }
        result.push({ ...clone });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
