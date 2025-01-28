'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  // Create a deep clone of an object to ensure immutability
  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  let currentState = deepClone(state);

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {}; // Replace with an empty state object
        break;

      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          currentState = { ...currentState, ...action.extraData };
        }
        break;

      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          currentState = { ...currentState }; // Clone the state object

          action.keysToRemove.forEach((key) => {
            delete currentState[key]; // Remove specified keys
          });
        }
        break;

      default:
        // Ignore unknown action types
        break;
    }

    // Push a deep clone of the current state to the result array
    states.push(deepClone(currentState));
  });

  return states;
}

module.exports = transformStateWithClones;
