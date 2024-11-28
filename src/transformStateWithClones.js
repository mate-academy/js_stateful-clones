'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateActions = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = {};

    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...currentState, ...action.extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const keyToRemove of action.keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      default:
        return stateActions;
    }
    stateActions.push(newState);
    currentState = newState;
  }

  return stateActions;
}

module.exports = transformStateWithClones;
