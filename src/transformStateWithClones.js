'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const stateCopy = JSON.parse(JSON.stringify(state));

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(stateCopy);
        break;
    }

    addStateCloneToHistory(stateHistory, stateCopy);
  }

  return stateHistory;
}

function addProperties(currentState, extraData) {
  Object.assign(currentState, extraData);
}

function removeProperties(currentState, keysToRemove) {
  for (const key of keysToRemove) {
    delete currentState[key];
  }
}

function clearProperties(currentState) {
  for (const key in currentState) {
    delete currentState[key];
  }
}

function addStateCloneToHistory(stateHistory, stateCopy) {
  stateHistory.push({ ...stateCopy });
}

module.exports = transformStateWithClones;
