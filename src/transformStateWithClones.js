'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const stateHistory = [];

  for (const property of actions) {
    if (property.type === 'addProperties') {
      Object.assign(currentState, property.extraData);
    }

    if (property.type === 'removeProperties') {
      property.keysToRemove.map((key) => {
        delete currentState[key];
      });
    }

    if (property.type === 'clear') {
      currentState = {};
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
