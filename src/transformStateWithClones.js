'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = { ...state };
  const array = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        for (const item in newObj) {
          delete newObj[item];
        }
        break;

      default:
        break;
    }

    array.push({ ...newObj });
  }

  return array;
}

module.exports = transformStateWithClones;
