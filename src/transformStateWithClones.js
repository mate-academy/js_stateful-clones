'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  // Використовуємо camelCase для назви змінної
  let currentState = { ...state };

  for (const action of actions) {
    // Використовуємо switch для обробки типів дій (Checklist Item #2)
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        // Створюємо копію для видалення властивостей
        const nextState = { ...currentState };

        for (const keyToRemove of action.keysToRemove) {
          delete nextState[keyToRemove];
        }
        currentState = nextState;
        break;

      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }

    // Додаємо клон актуального стану в історію
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
