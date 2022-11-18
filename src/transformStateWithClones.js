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

  for (const obj of actions) {
    const action = obj['type'];

    switch (action) {
      case 'addProperties':
        addProperties(stateCopy, obj.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, obj.keysToRemove);
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
