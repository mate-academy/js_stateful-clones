'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clone[key];
      }
    } else if (action.type === 'clear') {
      for (const keys in clone) {
        delete clone[keys];
      }
    }

    arr.push({ ...clone });
  }

  return arr;
}

module.exports = transformStateWithClones;
