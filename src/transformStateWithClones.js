'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let count = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(count, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete count[key];
        }
        break;

      case 'clear':
        count = {};
        break;

      default:
        break;
    }
    arr.push({ ...count });
  }

  return arr;
}

module.exports = transformStateWithClones;
