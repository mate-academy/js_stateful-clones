'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const allStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        currentState = clearProperties(currentState);
        break;

      default:
        throw new Error('Unknown action type');
    }
    allStates.push(currentState);
  }

  return allStates;
}

function addProperties(currentState, extraData) {
  const stateCopy = { ...currentState };

  return Object.assign(stateCopy, extraData);
}

function removeProperties(currentState, keysToRemove) {
  const stateCopy = { ...currentState };

  for (const keyRemove of keysToRemove) {
    delete stateCopy[keyRemove];
  }

  return stateCopy;
}

function clearProperties(currentState) {
  return {};
}

module.exports = transformStateWithClones;
