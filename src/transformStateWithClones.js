'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(State, actions) {
  const stateHistory = [];
  let currentState = { ...State };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties': {
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];
        for (const key of keys) {
          delete nextState[key];
        }
        break;
      }

      case 'clear':
        nextState = {};
        break;

      default:
        // залежно від політики: або пропускаємо, або кидаємо помилку
        // throw new Error(`Unknown action type: ${action.type}`);
        break;
    }

    // пушимо клон, щоб історія не ламалася при подальших змінах
    stateHistory.push({ ...nextState });
    currentState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
