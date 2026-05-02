'use strict';

/**
 * @param {Object} stateClone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateClone, action.extraData);
        stateHistory.push({ ...stateClone });
        break;

      case 'removeProperties':
        removeProperties(stateClone, action.keysToRemove);
        stateHistory.push({ ...stateClone });
        break;

      case 'clear':
        clearProperties(stateClone);
        stateHistory.push({ ...stateClone });
        break;
    }
  }

  return stateHistory;
}

function addProperties(stateClone, extraData) {
  Object.assign(stateClone, extraData);
}

function removeProperties(stateClone, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateClone[key];
  }
}

function clearProperties(stateClone) {
  for (const key in stateClone) {
    delete stateClone[key];
  }
}
module.exports = transformStateWithClones;
