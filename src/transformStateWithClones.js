'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateChanges = [];

  return transformState(stateCopy, actions, stateChanges);
}

function transformState(state, actions, stateChanges) {
  for (const action of actions) {
    doAction(action, state, stateChanges);
  }

  return stateChanges;
}

function doAction(action, state, stateChanges) {
  switch (action.type) {
    case 'addProperties':
      addProperties(action.extraData, state, stateChanges);
      break;

    case 'removeProperties':
      removeProperties(action.keysToRemove, state, stateChanges);
      break;

    case 'clear':
      clear(state, stateChanges);
      break;

    default:
      throw Error('Something went wrong');
  }
}

function addProperties(extraData, state, stateChanges) {
  for (const property in extraData) {
    state[property] = extraData[property];
  }

  stateChanges.push({ ...state });
}

function removeProperties(keysToRemove, state, stateChanges) {
  for (const property of keysToRemove) {
    delete state[property];
  }

  stateChanges.push({ ...state });
}

function clear(state, stateChanges) {
  for (const property in state) {
    delete state[property];
  }

  stateChanges.push({ ...state });
}

module.exports = transformStateWithClones;
