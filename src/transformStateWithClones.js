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
        cloneStates.push({ ...stateCopy });
        break;
      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        cloneStates.push({ ...stateCopy });
        break;
      case 'clear':
        removeProperties(stateCopy, Object.keys(stateCopy));
        cloneStates.push({ ...stateCopy });
        break;
      default:
        throw new Error('Error!');
    }
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
