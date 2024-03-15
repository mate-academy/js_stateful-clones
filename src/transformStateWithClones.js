'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // Клонуємо початковий стан

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      // Додаємо властивості з extraData
      currentState = {
        ...currentState, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      // Видаляємо властивості зі списку keysToRemove
      currentState = { ...currentState };

      action.keysToRemove.forEach(key => {
        delete currentState[key]; // Видаляємо ключ, якщо він існує
      });
    } else if (action.type === 'clear') {
      // Очищуємо стан
      currentState = {};
    }
    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
