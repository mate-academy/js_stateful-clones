'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        const keysToRemove = action.keysToRemove || [];

        stateCopy = Object.fromEntries(
          Object.entries(stateCopy).filter(
            ([key]) => !keysToRemove.includes(key),
          ),
        );
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    currentState = stateCopy;
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
