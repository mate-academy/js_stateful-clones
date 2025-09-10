'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const result = [];
  let stateCopy = { ...state };

  for (const value of actions) {
    switch (value.type) {
      case 'addProperties':
        if (value.extraData && typeof value.extraData === 'object') {
          stateCopy = { ...stateCopy, ...value.extraData };
        }
          break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        if (Array.isArray(value.keysToRemove)) {
          for (const key of value.keysToRemove) {
            delete stateCopy[key];
          }
        }

        break;

      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error('Unknown action type');
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
