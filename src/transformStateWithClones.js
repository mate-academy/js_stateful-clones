'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = { ...state }; // Копія початкового стану

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action; // Деструктуризація

    switch (type) {
      case 'addProperties':
        addProperties(newState, extraData);
        break;

      case 'removeProperties':
        removeProperties(newState, keysToRemove);
        break;

      case 'clear':
        clearProperties(newState);
        break;
    }

    // Додаємо копію поточного стану в історію
    stateHistory.push({ ...newState });
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

function clearProperties(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
