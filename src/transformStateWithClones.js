'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = structuredClone(state);

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;

      case 'removeProperties':
        {
          const newState = {};

          for (const key in currentState) {
            if (!keysToRemove.includes(key)) {
              newState[key] = currentState[key];
            }
          }

          currentState = newState;
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        return stateHistory;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
