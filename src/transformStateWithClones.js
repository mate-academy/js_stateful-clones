'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const history = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    switch (action.type) {
      case 'clear': {
        const stateCopy = {};

        currentState = stateCopy;
        break;
      }

      case 'addProperties': {
        const stateCopy = { ...currentState, ...action.extraData };

        currentState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        currentState = stateCopy;
        break;
      }
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
