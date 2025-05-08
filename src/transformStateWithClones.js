'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state }; // Початковий стан

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key]; // Видаляємо властивості
        }
        break;

      case 'clear':
        currentState = {}; // Очищуємо стан
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`); // Обробка невідомих типів дій
    }

    result.push({ ...currentState }); // Додаємо копію стану до результату
  }

  return result; // Повертаємо масив станів
}

module.exports = transformStateWithClones;
