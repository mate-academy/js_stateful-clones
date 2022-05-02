'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete newState[keys];
        }
        break;

      case 'clear':
        newState = {}
        break;

      default:
        break;
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
