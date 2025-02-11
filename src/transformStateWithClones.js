'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = { ...state }; // Копія початкового стану
  const result = [];

  for (const action of actions) {
    // Правильний цикл for...of для масиву дій
    switch (action.type) {
      case 'clear':
        clear(currentState);
        break;
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push({ ...currentState }); // Додаємо клон стану в масив результатів
  }

  return result;
}

function addProperties(obj, extraData) {
  Object.assign(obj, extraData);
}

function removeProperties(obj, keysToRemove) {
  keysToRemove.forEach((el) => {
    delete obj[el];
  });
}

function clear(obj) {
  for (const key in obj) {
    delete obj[key];
  }
}
module.exports = transformStateWithClones;
