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

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const key in extraData) {
          clone[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in clone) {
            delete clone[key];
          }
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;

      default:
        throw new Error(`Unknown action type: "${type}"`);
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
