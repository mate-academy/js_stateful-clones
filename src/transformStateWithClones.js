'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  const obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          if (removeKey in obj) {
            delete obj[removeKey];
          }
        }
        break;

      case 'clear':
        for (const a in obj) {
          delete obj[a];
        }
        break;

      default:
        for (const a in obj) {
          delete obj[a];
        }
        break;
    }

    newArr.push({ ...obj });
  }

  return newArr;
}

module.exports = transformStateWithClones;
