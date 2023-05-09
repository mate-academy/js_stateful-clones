'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        removeProperties(action.keysToRemove, stateCopy);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:
        throw new Error('Error');
    }

    newArr.push({ ...stateCopy });
  }

  return newArr;
}

function removeProperties(keysToRemove, state) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const property in state) {
    delete state[property];
  }
}

module.exports = transformStateWithClones;
