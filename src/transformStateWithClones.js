'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let newObj = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newObj, obj.extraData);
        break;

      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        newObj = {};
        break;
    }
    newArr.push({ ...newObj });
  }

  return newArr;
}

module.exports = transformStateWithClones;
