'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const keys in newState) {
          delete newState[keys];
        }
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
