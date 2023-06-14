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
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = {
          ...currentState, ...action['extraData'],
        };
        break;

      case 'removeProperties':
        newState = { ...currentState };
        action['keysToRemove'].forEach(key => delete newState[key]);
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error('Invalid action type');
    }

    arrayOfActions.push(newState);
    currentState = newState;
  }

  return arrayOfActions;
}

module.exports = transformStateWithClones;
