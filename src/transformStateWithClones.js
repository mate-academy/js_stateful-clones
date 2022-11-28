'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);

        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }

        break;

      case 'removeProperties':
        for (const removeKeys of action.keysToRemove) {
          delete clone[removeKeys];
        }

        break;

      default:
        break;
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
