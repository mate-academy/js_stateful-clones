'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // Клонуємо початковий стан
  let currentState = JSON.parse(JSON.stringify(state));
  const history = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    // Очищаємо стан
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        currentState[key] = action.extraData[key];
      }
    } else if (action.type === 'removeProperties') {
      for (let j = 0; j < action.keysToRemove.length; j++) {
        // Видаляємо зазначені ключі
        delete currentState[action.keysToRemove[j]];
      }
    }

    // Додаємо копію поточного стану в історію
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
