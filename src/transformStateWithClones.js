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

        allStates.push({ ...newState });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete newState[key]);

        allStates.push({ ...newState });
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }

        allStates.push({ ...newState });
        break;

      default:
        return 'Something wrong:( Try again later';
    }
  }

  return allStates;
}

module.exports = transformStateWithClones;
