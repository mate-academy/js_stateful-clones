'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const cloneStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
      case 'clear':
        removeProperties(stateCopy, Object.keys(stateCopy));
        break;
      default:
        throw new Error('Error!');
    }

    cloneStates.push({ ...stateCopy });
  }

  return cloneStates;
}

function addProperties(state, data) {
  for (const property in data) {
    state[property] = data[property];
  }
}

function removeProperties(state, properties) {
  for (const property of properties) {
    delete state[property];
  }
}

module.exports = transformStateWithClones;
