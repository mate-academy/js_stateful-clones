'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = structuredClone(state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData, stateHistory);
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove, stateHistory);
        break;

      case 'clear':
        clearProperties(stateClone, stateHistory);
        break;
    }
    stateHistory.push({ ...stateClone });
  }

  return stateHistory;
}

function addProperties(objectToAddTo, dataToAdd, arrayLog) {
  Object.assign(objectToAddTo, dataToAdd);
}

function removeProperties(objectToRemoveFrom, keysToRemove, arrayLog) {
  for (const key of keysToRemove) {
    delete objectToRemoveFrom[key];
  }
}

function clearProperties(objectToClear, arrayLog) {
  for (const key in objectToClear) {
    delete objectToClear[key];
  }
}

module.exports = transformStateWithClones;
