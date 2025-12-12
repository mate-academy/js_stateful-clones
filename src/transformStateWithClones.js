'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const HISTORY = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addPropertiesImmutable(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removePropertiesImmutable(
          currentState,
          action.keysToRemove,
        );
        break;

      case 'clear':
        currentState = clearPropertiesImmutable();
        break;

      default:
        break;
    }

    HISTORY.push(currentState);
  }

  return HISTORY;
}

function addPropertiesImmutable(state, extraData) {
  return { ...state, ...extraData };
}

function removePropertiesImmutable(state, keysToRemove) {
  const newState = { ...state };

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearPropertiesImmutable() {
  return {};
}

module.exports = transformStateWithClones;
