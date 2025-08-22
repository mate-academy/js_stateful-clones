'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;

      case 'addProperties':
        if (
          action.extraData &&
          typeof action.extraData === 'object' &&
          !Array.isArray(action.extraData)
        ) {
          currentState = { ...currentState, ...action.extraData };
        } else {
          throw new Error(
            `Invalid extraData for addProperties: ${JSON.stringify(action.extraData)}`,
          );
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          const newState = {};

          for (const key in currentState) {
            if (!action.keysToRemove.includes(key)) {
              newState[key] = currentState[key];
            }
          }
          currentState = newState;
        } else {
          throw new Error(
            `Invalid keysToRemove for removeProperties: ${JSON.stringify(action.keysToRemove)}`,
          );
        }
        break;

      default:
        throw new Error(`Unknown action.type: ${action.type}`);
    }

    // клон після кожної дії
    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
