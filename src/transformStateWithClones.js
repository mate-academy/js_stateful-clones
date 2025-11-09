'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        currentState = { ...currentState, ...(action.extraData || {}) };
        break;

      case 'removeProperties': {
        const keysToRemove = action.keysToRemove || [];

        currentState = Object.fromEntries(
          Object.entries(currentState).filter(
            ([key]) => !keysToRemove.includes(key),
          ),
        );
        break;
      }

      default:
        currentState = { ...currentState };
        break;
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
