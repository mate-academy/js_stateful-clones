'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesList = [];
  const stateCopy = {
    ...state,
  };

  for (const action of actions) {
    const actionType = action.type;

    switch (actionType) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy);
        break;

      default:
        break;
    }

    clonesList.push({ ...stateCopy });
  }

  return clonesList;
}

function addProperties(state, data) {
  for (const key in data) {
    state[key] = data[key];
  }
}

function removeProperties(state, toRemove) {
  for (const itemRemove of toRemove) {
    delete state[itemRemove];
  }
}

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
