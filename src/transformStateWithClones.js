'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    actionPerform(action);
  }

  function actionPerform({ type, extraData, keysToRemove } = {}) {
    switch (true) {
      case type === 'addProperties':
        for (const [key, value] of Object.entries(extraData)) {
          stateCopy[key] = value;
        }
        break;

      case type === 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case type === 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }
        break;

      default:
        return;
    }

    stateHistory.push(Object.assign({}, stateCopy));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
