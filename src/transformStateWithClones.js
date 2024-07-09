'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyClones = [];
  const currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
        break;

      case 'addProperties':
        Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (currentState[key]) {
            delete currentState[key];
          }
        }
        break;
      default:
        throw new Error(`unexpected action ${action}`);
    }

    historyClones.push({ ...currentState });
  }

  return historyClones;
}

module.exports = transformStateWithClones;
