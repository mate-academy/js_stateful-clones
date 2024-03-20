'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const clear = () => {
  return {};
};

const addProperties = (state, extraData) => {
  const stateCopy = { ...state };

  Object.assign(stateCopy, extraData);

  return stateCopy;
};

const removeProperties = (state, keysToRemove) => {
  const stateCopy = { ...state };

  for (const key of keysToRemove) {
    if (stateCopy[key]) {
      delete stateCopy[key];
    }
  }

  return stateCopy;
};

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = state;

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        stateHistory.push(currentState);
        continue;
      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        stateHistory.push(currentState);
        continue;
      case 'clear':
        currentState = clear();
        stateHistory.push(currentState);
        continue;
      default:
        continue;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
