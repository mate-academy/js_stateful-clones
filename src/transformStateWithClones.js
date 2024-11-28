'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state };

  for (const action of actions) {
    const { type = null, extraData = {}, keysToRemove = [] } = action;

    switch (type) {
      case 'addProperties':
        addProperties(currentState, extraData);
        break;
      case 'removeProperties':
        removeProperties(currentState, keysToRemove);
        break;
      case 'clear':
        clear(currentState);
        break;
      default:
        break;
    }

    stateHistory.push({ ...currentState });

    currentState = { ...currentState };
  }

  return stateHistory;
}

function addProperties(stateToAddProp, extraData) {
  Object.assign(stateToAddProp, extraData);
}

function removeProperties(stateToRemoveProp, keysToRemove) {
  for (const key of keysToRemove) {
    delete stateToRemoveProp[key];
  }
}

function clear(stateToClear) {
  for (const key in stateToClear) {
    delete stateToClear[key];
  }
}

module.exports = transformStateWithClones;
