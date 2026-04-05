'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        clearProperties(stateCopy);
        break;

      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;
    }

    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

function clearProperties(stateCopy) {
  for (const key in stateCopy) {
    delete stateCopy[key];
  }
}

function addProperties(stateCopy, extraData) {
  Object.assign(stateCopy, extraData);
}

function removeProperties(stateCopy, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateCopy[key];
  }
}

module.exports = transformStateWithClones;
