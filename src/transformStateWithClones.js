'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          obj[key] = action.extraData[key];
        }
        result.push({ ...obj });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (obj.hasOwnProperty(key)) {
            delete obj[key];
          }
        }
        result.push({ ...obj });
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        result.push({ ...obj });
        break;

      default:
        continue;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
