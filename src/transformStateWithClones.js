'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state }; // Початкова копія
  const results = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Порожній об'єкт
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState }; // копія

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        // ігноруємо невідомі типи дій
        break;
    }

    results.push({ ...currentState }); // Зберігаємо копію у results
  }

  return results;
}

module.exports = transformStateWithClones;
