'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = Object.assign({}, state);
  const newStatesArray = [];

  for (const action of actions) {
    newState = { ...newState };

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
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        return [];
    }
    newStatesArray.push({ ...newState });
  }

  return newStatesArray;
}

module.exports = transformStateWithClones;
