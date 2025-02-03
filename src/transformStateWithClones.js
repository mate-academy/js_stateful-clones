'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = []; // Масив для зберігання проміжних станів
  let currentState = { ...state }; // Копіюємо початковий стан

  for (const action of actions) {
    // Проходимо по кожній дії
    if (action.type === 'clear') {
      currentState = {}; // Очищуємо стан
    } else if (action.type === 'addProperties' && action.extraData) {
      currentState = { ...currentState, ...action.extraData };
    } else if (
      action.type === 'removeProperties' &&
      Array.isArray(action.keysToRemove)
    ) {
      const newState = { ...currentState }; // Робимо копію поточного стану

      action.keysToRemove.forEach((key) => delete newState[key]);
      currentState = newState; // Оновлюємо поточний стан
    }

    result.push({ ...currentState }); // Додаємо копію стану до результату
  }

  return result; // Повертаємо масив станів
}

module.exports = transformStateWithClones;
