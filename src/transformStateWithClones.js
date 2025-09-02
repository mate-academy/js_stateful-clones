'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(currentState, extraData);

      const stateCopy = { ...currentState };

      stateHistory.push(Object.assign({}, stateCopy));
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete currentState[key];
      }

      const stateCopy = { ...currentState };

      stateHistory.push(Object.assign({}, stateCopy));
    } else if (type === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }

      const stateCopy = { ...currentState };

      stateHistory.push(Object.assign({}, stateCopy));
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
