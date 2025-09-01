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
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties': {
        const extraData =
          action &&
          typeof action.extraData === 'object' &&
          action.extraData !== null &&
          !Array.isArray(action.extraData)
            ? action.extraData
            : {};

        currentState = {
          ...currentState,
          ...extraData,
        };
        break;
      }

      case 'removeProperties':
        currentState = { ...currentState };

        if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
        }
        break;

      default:
        continue;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
