'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        const stateCopy = { ...currentState };
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        currentState = stateCopy;
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...currentState }); // ← ПРАВИЛЬНО
  }

  return history;
}

module.exports = transformStateWithClones;
