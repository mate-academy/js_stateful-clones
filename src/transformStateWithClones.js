'use strict';

function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let currentState = { ...state };

  function addProperties(stateObj, extraData) {
    Object.assign(stateObj, extraData);
  }

  function removeProperties(stateObj, keysToRemove) {
    for (const key of keysToRemove) {
      delete stateObj[key];
    }
  }

  function clearProperties(stateObj) {
    for (const key in stateObj) {
      delete stateObj[key];
    }
  }

  for (const action of actions) {
    const nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        addProperties(nextState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(nextState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(nextState);
        break;
    }

    stateHistory.push(nextState);
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
