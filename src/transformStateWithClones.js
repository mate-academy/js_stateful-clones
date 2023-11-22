'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newObj = {
    ...state,
  };
  const newArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        newArray.push({ ...newObj });
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete newObj[prop];
        }
        newArray.push({ ...newObj });
        break;

      case 'clear':
        newObj = {};
        newArray.push({ ...newObj });
        break;

      default:
        return null;
    }
  }

  return newArray;
}

module.exports = transformStateWithClones;
