'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // клон початкового стану

  for (const action of actions) {
    let nextState = { ...currentState }; // створюємо копію для оновлень

    switch (action.type) {
      case 'clear':
        nextState = {}; // просто очищаємо
        break;

      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          nextState = { ...nextState, ...action.extraData };
        } else {
          throw new Error(`Invalid extraData: ${action.extraData}`);
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
        } else {
          throw new Error(`Invalid keysToRemove: ${action.keysToRemove}`);
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(nextState);
    currentState = nextState; // оновлюємо для наступної ітерації
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
