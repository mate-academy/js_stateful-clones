'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD_PROPERTIES_TYPE = 'addProperties';
  const REMOVE_PROPERTIES_TYPE = 'removeProperties';
  const CLEAR_TYPE = 'clear';
  const ERROR_MESSAGE = 'Error: action has unexpected type';

  let previousState = objectClone(state);
  const stateHistory = [];

  for (const action of actions) {
    const currentState = objectClone(previousState);

    switch (action.type) {
      case ADD_PROPERTIES_TYPE:
        addProperties(currentState, action.extraData);
        break;
      case REMOVE_PROPERTIES_TYPE:
        removeProperties(currentState, action.keysToRemove);
        break;
      case CLEAR_TYPE:
        clear(currentState);
        break;
      default:
        throw ERROR_MESSAGE;
    }

    stateHistory.push(currentState);
    previousState = objectClone(currentState);
  }

  return stateHistory;
}

function objectClone(source) {
  return { ...source };
}

function addProperties(state, extraData) {
  for (const key in extraData) {
    state[key] = extraData[key];
  }
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
