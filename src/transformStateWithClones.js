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
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties': {
        const nextState = { ...currentState };

        const keys = action.keysToRemove || [];

        for (const key of keys) {
          delete nextState[key];
        }
        currentState = nextState;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default: {
        return `Unknown action type: "${action.type}". Check your actions array.`;
      }
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
