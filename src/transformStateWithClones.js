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
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        break;
    }

    arr.push({ ...newObj });
  }

  return arr;
}

module.exports = transformStateWithClones;
