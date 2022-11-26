'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action);
        break;

      case 'clear':
        clear(stateCopy);
        break;

      default:
        break;
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

function addProperties(state, action) {
  for (const data in action.extraData) {
    state[data] = action.extraData[data];
  }
}

function removeProperties(state, action) {
  for (const key of action.keysToRemove) {
    delete state[key];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
