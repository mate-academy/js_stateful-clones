'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    // stateHistory[stateHistory.length - 1]: це доступ
    // до останнього елемента масиву stateHistory.
    // Оскільки індексація масиву починається з нуля,
    // останній елемент буде знаходитися за індексом stateHistory.length - 1.
    // ...stateHistory[stateHistory.length - 1] — це створення поверхневої
    // копії цього останнього елемента (останнього стану),
    // що знаходиться в масиві stateHistory.
    const currentState =
      stateHistory.length === 0
        ? { ...state }
        : { ...stateHistory[stateHistory.length - 1] };

    switch (action.type) {
      case 'addProperties':
        addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        clearProperties(currentState);
        break;

      default:
        break;
    }
    stateHistory.push({ ...currentState });
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
