'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const historyOfState = [];

  for (const action of actions) {
    for (const key in action) {
      if (action[key] === 'addProperties') {
        addProperties(stateClone, action.extraData);
        historyOfState.push({ ...stateClone });
      }

      if (action[key] === 'removeProperties') {
        removeProperties(stateClone, action.keysToRemove);
        historyOfState.push({ ...stateClone });
      }

      if (action[key] === 'clear') {
        clearProperties(stateClone);
        historyOfState.push({ ...stateClone });
      }
    }
  }

  return historyOfState;
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
