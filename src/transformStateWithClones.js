'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  // Initialize the result array to store all states
  const results = [];

  // Clone the initial state
  let currentState = { ...state };

  // Process each transform operation
  transforms.forEach((transform) => {
    // Create a new clone for each operation
    currentState = { ...currentState };

    switch (transform.type) {
      case 'addProperties':
        // Add or update properties from extraData
        currentState = {
          ...currentState,
          ...transform.extraData,
        };
        break;

      case 'removeProperties':
        // Remove specified properties
        if (transform.keysToRemove && transform.keysToRemove.length > 0) {
          transform.keysToRemove.forEach((key) => {
            delete currentState[key];
          });
        }
        break;

      case 'clear':
        // Reset to empty object
        currentState = {};
        break;
    }

    // Add the new state to results
    results.push(currentState);
  });

  return results;
}

module.exports = transformStateWithClones;
