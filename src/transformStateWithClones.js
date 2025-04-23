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
    const { type } = action;

    switch (type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete currentState[keyToRemove];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
      default:
        throw new TypeError(`Action type '${type}' is invalid`);
    }

    stateHistory.push(structuredClone(currentState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
