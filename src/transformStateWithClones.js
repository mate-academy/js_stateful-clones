'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let nextState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = { ...nextState, ...(action.extraData || {}) };
        break;

      case 'removeProperties': {
        const keys = Array.isArray(action.keysToRemove)
          ? new Set(action.keysToRemove)
          : new Set();

        nextState = Object.fromEntries(
          Object.entries(nextState).filter(([key]) => !keys.has(key)),
        );
        break;
      }

      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    result.push({ ...nextState });
  }

  return result;
}

module.exports = transformStateWithClones;
