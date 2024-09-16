'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultOfStates = [];
  const newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(newState, action.extraData);
        pushResult();
        break;

      case 'removeProperties':
        removeProperties(newState, action.keysToRemove);
        pushResult();
        break;

      case 'clear':
        clear(newState);
        pushResult();
        break;
    }
  }

  function pushResult() {
    resultOfStates.push({ ...newState });
  }

  return resultOfStates;
}

function addProperties(newState, extraData) {
  Object.assign(newState, extraData);
}

function removeProperties(newState, keysToRemove) {
  for (const key of keysToRemove) {
    delete newState[key];
  }
}

function clear(newState) {
  for (const key in newState) {
    delete newState[key];
  }
}

module.exports = transformStateWithClones;
