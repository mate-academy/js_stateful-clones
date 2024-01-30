'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          if (clone.hasOwnProperty(prop)) {
            delete clone[prop];
          }
        }
        break;

      default:
        clone = {};
        break;
    }
    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
