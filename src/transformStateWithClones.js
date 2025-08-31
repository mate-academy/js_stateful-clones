'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const logs = [];

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

      default:
        break;
    }

    log(stateCopy, logs);
  }

  return logs;
}

function addProperties(stateCopy, dataToAdd) {
  Object.assign(stateCopy, dataToAdd);
}

function removeProperties(stateCopy, dataToRemove) {
  for (const key of dataToRemove) {
    delete stateCopy[key];
  }
}

function clearProperties(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

function log(stateToLog, logs) {
  logs.push({ ...stateToLog });
}

module.exports = transformStateWithClones;
