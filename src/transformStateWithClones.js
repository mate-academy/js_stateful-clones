'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Создаём копию начального состояния
  let currentState = { ...state };
  const stateHistory = [];

  // Обрабатываем каждый экшен
  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Сохраняем текущую копию состояния в историю
    stateHistory.push({ ...currentState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
