'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const copyObj = {
    ...state,
  };
  const copyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyObj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyObj[key];
        }
        break;
      case 'clear':
        Object.keys(copyObj).forEach(key => delete copyObj[key]);
        break;
      default:
        return null;
    }
    copyArray.push({ ...copyObj });
  }

  return copyArray;
}

module.exports = transformStateWithClones;
