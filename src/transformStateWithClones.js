'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const obj = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (obj.hasOwnProperty(key)) {
            delete obj[key];
          }
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
