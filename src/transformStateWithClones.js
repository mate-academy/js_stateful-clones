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
        action.keysToRemove.forEach(key => delete newState[key]);
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        return 'Something wrong:( Try again later';
    }

    allStates.push({ ...newState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
