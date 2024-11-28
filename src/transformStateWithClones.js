'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const historyStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearState(stateCopy);
        break;

      default:
        throw new Error('The type of action is not correct');
    }

    historyStates.push({ ...stateCopy });
  }

  return historyStates;
}

function clearState(stateToClear) {
  for (const key in stateToClear) {
    delete stateToClear[key];
  }
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

function addProperties(state, extraData) {
  for (const key in extraData) {
    state[key] = extraData[key];
  }
}

module.exports = transformStateWithClones;
