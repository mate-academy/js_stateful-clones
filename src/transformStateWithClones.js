'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function addProperties(action, state) {
  for (const key in action.extraData) {
    state[key] = action.extraData[key];
  }

  return state;
}

function removeProperties(action, state) {
  for (const key of action.keysToRemove) {
    delete state[key];
  }

  return state;
}

function transformStateWithClones(state, actions) {
  const finalState = [];
  let newState = { ...state };

  for (const currentAction of actions) {
    switch (currentAction.type) {
      case 'addProperties':
        finalState.push(addProperties(currentAction, newState));
        break;

      case 'clear':
        finalState.push({});
        break;

      case 'removeProperties':
        finalState.push(removeProperties(currentAction, newState));
        break;

      default:
        throw new Error(`Invalid action type: ${currentAction.type}`);
    }

    newState = { ...finalState[finalState.length - 1] };
  }

  return finalState;
}

module.exports = transformStateWithClones;
