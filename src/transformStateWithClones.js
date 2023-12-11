'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newObj = { ...state };
  const result = [];

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newObj, obj.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < obj.keysToRemove.length; i++) {
          delete newObj[obj.keysToRemove[i]];
        }
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;
