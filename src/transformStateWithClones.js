'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'clear':
        newState = clearProperty();
        break;

      case 'addProperties':
        newState = addProperties(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = removeProperties(newState, action.keysToRemove);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push(newState);
    currentState = newState;
  }

  return history;
}

function clearProperty() {
  const newState = {};

  return newState;
}

function addProperties(currentState, extraData) {
  return Object.assign({}, currentState, extraData);
}

function removeProperties(currentState, keysToRemove) {
  const newState = { ...currentState };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

module.exports = transformStateWithClones;
