'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clonedStates = [];

  let clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clonedState = addProperties(clonedState, action.extraData);
        break;
      case 'removeProperties':
        clonedState = removeProperties(clonedState, action.keysToRemove);
        break;
      case 'clear':
        clonedState = clearProperties(clonedState);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    clonedStates.push(clonedState);
  }

  return clonedStates;
}

function addProperties(state, properties) {
  const clonedState = { ...state };

  Object.assign(clonedState, properties);

  return clonedState;
}

function removeProperties(state, properties) {
  const clonedState = { ...state };

  for (const prop of properties) {
    delete clonedState[prop];
  }

  return clonedState;
}

function clearProperties(state) {
  return {};
}

module.exports = transformStateWithClones;
