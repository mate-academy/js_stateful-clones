'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayActions = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((index) => delete newState[index]);
        break;

      case 'clear':
        for (const keys in newState) {
          delete newState[keys];
        }
        break;

      default:
        break;
    }
    arrayActions.push({ ...newState });
  }

  return arrayActions;
}

module.exports = transformStateWithClones;
