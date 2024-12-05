'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const stateHistory = [];
  let currentState = { ...initialState }; // Клонування початкового стану

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      // Додаємо властивості з extraData
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      // Видаляємо вказані властивості
      currentState = Object.keys(currentState).reduce((newState, key) => {
        if (!action.keysToRemove.includes(key)) {
          newState[key] = currentState[key];
        }

        return newState;
      }, {});
    } else if (action.type === 'clear') {
      // Очищення стану
      currentState = {};
    }
    // Зберігаємо поточний стан у історії
    stateHistory.push(currentState);
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
