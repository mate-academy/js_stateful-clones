'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          currentState = {
            ...currentState,
            ...action.extraData,
          };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          // Faz uma cópia antes de deletar propriedades
          currentState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete currentState[key];
          }
        }
        break;

      default:
        break;
    }

    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
