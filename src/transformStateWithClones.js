'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const allStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete newState[property];
        }
        break;

      case 'clear':
        Object.keys(newState).forEach(key => delete newState[key]);
        break;

      default:
        break;
    }

    allStates.push({ ...newState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
