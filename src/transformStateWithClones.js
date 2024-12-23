'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  if (!Array.isArray(actions)) {
    throw new Error('Параметр "actions" должен быть массивом.');
  }

  let currentState = { ...initialState };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (!action.extraData || typeof action.extraData !== 'object') {
          throw new Error(
            'Для действия "addProperties" требуется объект "extraData".',
          );
        }
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        if (!Array.isArray(action.keysToRemove)) {
          throw new Error(
            'Для действия "removeProperties" требуется массив "keysToRemove".',
          );
        }
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      default:
        throw new Error(`Неизвестный тип действия: ${action.type}`);
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
