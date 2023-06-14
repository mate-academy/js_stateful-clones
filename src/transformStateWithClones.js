'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfActions = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error('Invalid action type');
    }

    arrayOfActions.push({ ...currentState });
  }

  return arrayOfActions;
}

module.exports = transformStateWithClones;
