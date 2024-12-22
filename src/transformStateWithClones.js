'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let currentState = { ...state };

  for (const operation of actions) {
    let newState = { ...currentState };

    switch (operation.type) {
      case 'addProperties':
        // Добавляем новые свойства
        newState = { ...newState, ...operation.extraData };
        break;

      case 'removeProperties':
        // Удаляем указанные свойства
        for (const key of operation.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        throw new Error(`Unhandled action type: ${operation.type}`);
    }
    currentState = newState;

    // Добавляем копию нового состояния в результат
    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
