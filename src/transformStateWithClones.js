'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = { ...state };

  for (const properties of actions) {
    const { extraData, keysToRemove, type } = properties;

    switch (type) {
      case 'addProperties':
        for (const value in extraData) {
          obj[value] = extraData[value];
        }
        break;

      case 'removeProperties':
        for (const value of keysToRemove) {
          if (value in obj) {
            delete obj[value];
          }
        }
        break;

      case 'clear':
        obj = {};
        break;

      default:
        break;
    }

    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
