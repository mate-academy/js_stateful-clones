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
      case 'addProperties':
        Object.assign(newState, action.extraData);
        arr.push({ ...newState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        arr.push({ ...newState });
        break;

      case 'clear':
        for (const keys in newState) {
          delete newState[keys];
        }
        arr.push({ ...newState });
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
