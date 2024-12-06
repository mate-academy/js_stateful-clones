'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let transformedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        transformedState = {};
        break;

      case 'addProperties':
        if (typeof action.extraData !== 'object' || action.extraData === null) {
          throw new Error('Invalid extraData: Must be a non-null object');
        }
        transformedState = { ...transformedState, ...action.extraData };
        break;

      case 'removeProperties':
        if (!Array.isArray(action.keysToRemove)) {
          throw new Error('Invalid keysToRemove: Must be an array of keys');
        }

        transformedState = Object.fromEntries(
          Object.entries(transformedState).filter(
            ([key]) => !action.keysToRemove.includes(key),
          ),
        );
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...transformedState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
