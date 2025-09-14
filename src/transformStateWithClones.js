'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  let currentState = { ...initialState };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const extraData =
          action.extraData && typeof action.extraData === 'object'
            ? action.extraData
            : {};
        const stateCopy = { ...currentState, ...extraData };

        currentState = stateCopy;
        break;
      }

      case 'removeProperties': {
        const stateCopy = { ...currentState };

        if (Array.isArray(action.keysToRemove)) {
          for (const key of action.keysToRemove) {
            delete stateCopy[key];
          }
        }
        currentState = stateCopy;
        break;
      }

      case 'clear': {
        currentState = {};
        break;
      }

      default: {
        throw new Error(`Unknown action type: ${action.type}`);
      }
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
