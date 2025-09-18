'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  if (typeof state !== 'object' || state === null) {
    throw new Error('State must be an object');
  }

  if (!Array.isArray(actions)) {
    throw new Error('Actions must be an array');
  }

  const result = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];

    if (typeof action !== 'object' || action === null) {
      throw new Error('Each action must be an object');
    }

    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          action.extraData !== null
        ) {
          currentState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          const newState = { ...currentState };

          for (const key of action.keysToRemove) {
            delete newState[key];
          }
          currentState = newState;
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
