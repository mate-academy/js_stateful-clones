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

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        obj = {};
        break;

      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }
        break;

      default:
        return 'Invalid type data';
    }

    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
