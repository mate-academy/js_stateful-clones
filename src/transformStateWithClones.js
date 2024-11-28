'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let newObj = Object.assign({}, state);

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        newObj = Object.assign(newObj, obj.extraData);
        break;
      case 'removeProperties':
        for (const keyToRemove of obj.keysToRemove) {
          delete newObj[keyToRemove];
        }
        break;
      case 'clear':
        newObj = {};
        break;
      default:
        break;
    }
    res.push({ ...newObj });
  }

  return res;
}

module.exports = transformStateWithClones;
