'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let currentState = { ...state }; // клон початкового стану

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        // створюємо порожній стан
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        // створюємо клон поточного стану та видаляємо потрібні ключі
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        // можна додати обробку невідомих типів дій
        break;
    }
    // Додаємо поточний стан до масиву результатів
    resultStates.push(currentState);
  }

  return resultStates;
}

module.exports = transformStateWithClones;
