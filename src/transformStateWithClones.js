'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const outputObjArr = [];
  const newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete newObj[keyToRemove];
        }
        break;
      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        break;
      default:
        throw new Error('Unknown action');
    }

    outputObjArr.push({ ...newObj });
  }

  return outputObjArr;
}

module.exports = transformStateWithClones;
