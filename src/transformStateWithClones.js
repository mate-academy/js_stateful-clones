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
    delete stateCopy[key];
  }

  return stateCopy;
};

function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = state;

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        currentState = addProperties(currentState, extraData);
        break;
      case 'removeProperties':
        currentState = removeProperties(currentState, keysToRemove);
        break;
      case 'clear':
        currentState = clear();
        break;
      default:
        throw new Error(`Invalid action type: ${type}`);
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
