'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state }; // Начальное состояние
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Очищаем состояние
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState }; // Клонируем объект
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;
    }
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
