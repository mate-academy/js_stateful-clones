'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state }; // Клонируем начальное состояние

  for (const action of actions) {
    // Создаем клон перед каждым действием, чтобы не портить прошлые состояния
    currentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        currentState = {};
        break;
    }

    stateHistory.push({ ...currentState }); // Сохраняем клон текущего состояния
  }

  return stateHistory;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
