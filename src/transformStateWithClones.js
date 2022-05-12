'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  const newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const prop in action.extraData) {
          newObj[prop] = action.extraData[prop];
        }
        newArr.push({ ...newObj });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        newArr.push({ ...newObj });
        break;

      case 'clear':
        for (const prop in newObj) {
          delete newObj[prop];
        }
        newArr.push({ ...newObj });
        break;
    }
  }

  return newArr;
}

module.exports = transformStateWithClones;
