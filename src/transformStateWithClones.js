'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const obj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(obj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (obj[key]) {
            delete obj[key];
          }
        }
        break;
      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
      default:
        throw new Error('Unknown action');
    }

    const newObj = { ...obj };

    arr.push(newObj);
  }

  return arr;
}

module.exports = transformStateWithClones;
