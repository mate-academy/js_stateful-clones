'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        currentState[key] = value;
      }

      stateHistory.push({ ...currentState });
    } else if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete currentState[keyToRemove];
      }
      stateHistory.push({ ...currentState });
    } else if (action.type === 'clear') {
      const items = Object.keys(currentState);

      for (let i = 0; i < items.length; i++) {
        delete currentState[items[i]];
      }
      stateHistory.push({ ...currentState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
