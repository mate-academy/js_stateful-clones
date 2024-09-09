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

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        // Очищаем текущее состояние
        currentState = {};
        break;

      case 'addProperties':
        // Добавляем свойства из extraData
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Удаляем указанные свойства
        currentState = { ...currentState }; // Клонируем текущее состояние

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Добавляем текущее состояние в историю
    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

module.exports = transformStateWithClones;
