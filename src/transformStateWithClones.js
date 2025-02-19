'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj)); // Простий спосіб глибокого копіювання
  };

  let currentState = deepClone(state); // Створюємо глибоку копію початкового стану
  const stateHistory = [currentState]; // Містить всі стани після кожної дії

  actions.forEach(action => {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Створюємо порожній об'єкт
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData }; // Додаємо нові властивості
        break;
      case 'removeProperties':
        const newState = { ...currentState };
        action.keysToRemove.forEach(key => {
          delete newState[key]; // Видаляємо зазначені властивості
        });
        currentState = newState;
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateHistory.push(deepClone(currentState)); // Додаємо новий стан в історію
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
