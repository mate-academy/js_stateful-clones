'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [ { ...state } ];  // Початковий стан, копія початкового state

  // Перебираємо всі дії
  for (const action of actions) {
    let newState = { ...states[states.length - 1] }; // Копія останнього стану

    switch (action.type) {
      case 'clear':
        newState = {}; // Порожній об'єкт для clear
        break;

      case 'addProperties':
        // Додаємо властивості з extraData до нового стану
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        // Видаляємо властивості з keysToRemove
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      default:
        // Якщо action.type невідомий, ми не змінюємо стан
        break;
    }

    states.push(newState); // Додаємо новий стан до масиву
  }

  return states; // Повертаємо масив всіх станів
}



module.exports = transformStateWithClones;
