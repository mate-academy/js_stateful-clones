'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clones = [];
  const currentState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        clearState(currentState);
        break;
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;
      default:
        return 'Invalid data';
    }

    clones.push({ ...currentState });
  });

  return clones;
}

function clearState(state) {
  for (const key in state) {
    delete state[key];
  }
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, properties) {
  for (const property of properties) {
    delete state[property];
  }
}

module.exports = transformStateWithClones;
