'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  const newObj = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const prop in action.extraData) {
          newObj[prop] = action.extraData[prop];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        for (const prop in newObj) {
          delete newObj[prop];
        }
        break;
    }
    newArr.push({ ...newObj });
  }

  return newArr;
}

module.exports = transformStateWithClones;
