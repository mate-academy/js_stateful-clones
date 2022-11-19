'use strict';

/**
 * @param {Object} localState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listOfClones = [];
  const stateCopy = {
    ...state,
  };

  for (const action of actions) {
    const actionType = action['type'];

    switch (actionType) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:

        break;
    }

    listOfClones.push({ ...stateCopy });
  }

  return listOfClones;
}

function addProperties(state, data) {
  for (const key in data) {
    state[key] = data[key];
  }
}

function removeProperties(state, toRemove) {
  for (const itemToRemove of toRemove) {
    delete state[itemToRemove];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
