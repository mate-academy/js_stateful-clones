'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedStatesArray = [];

  let currentState = cloneState(state);

  for (const action of actions) {
    currentState = cloneState(currentState);

    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;
      case 'clear':
        clearProperties(currentState);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    clonedStatesArray.push(currentState);
  }

  return clonedStatesArray;
}

function cloneState(state) {
  return Object.assign({}, state);
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
