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
    const stateCopy = { ...currentState };
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'addProperties':
        Object.assign(stateCopy, extraData);

        break;

      default:
        return 'error';
    }

    stateHistory.push(stateCopy);
    currentState = stateCopy;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
