/* eslint-disable max-len */
'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// eslint-disable-next-line no-unused-vars
function transformStateWithClones(state, actions) {
  const history = [];
  // Створюємо копію, щоб не змінювати початковий об'єкт
  let currentState = { ...state };

  for (const action of actions) {
    if (!action || typeof action.type !== 'string') {
      continue;
    }

    switch (action.type) {
      case 'addProperties':
        // Додаємо властивості, тільки якщо extraData — це об'єкт
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          // Створюємо новий об'єкт
          currentState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        // Видаляємо властивості
        if (
          Array.isArray(action.keysToRemove) &&
          action.keysToRemove.length > 0
        ) {
          // Створюємо новий клон
          const nextState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete nextState[key];
          }
          currentState = nextState;
        }
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        break;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
