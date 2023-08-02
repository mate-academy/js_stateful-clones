'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function addProperties(state, addObject) {
  for (const addProperty in addObject) {
    state[addProperty] = addObject[addProperty];
  }
}

function removeProperties(state, arrProperties) {
  for (const removeProperty of arrProperties) {
    delete state[removeProperty];
  }
}

function removeAllProperty(state) {
  for (const key in state) {
    delete state[key];
  }
}

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        addProperties(stateCopy, action.extraData);
        break;
      }

      case 'removeProperties': {
        removeProperties(stateCopy, action.keysToRemove);
        break;
      }

      case 'clear': {
        removeAllProperty(stateCopy);
        break;
      }

      default: throw new Error('object does not know this type');
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
