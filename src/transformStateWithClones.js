'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const FINAL_RESULT = [];
  let NEXT_STATE = { ...state }; // Clone the original state to start with

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        // Create a new object by merging the current state with extra data
        NEXT_STATE = { ...NEXT_STATE, ...action.extraData };
        break;

      case 'removeProperties':
        // Create a new state where the properties are removed
        const NEXT_STATE1 = { ...NEXT_STATE };

        for (const keyToRemove of action.keysToRemove) {
          delete NEXT_STATE1[keyToRemove];
        }
        NEXT_STATE = NEXT_STATE1; // Update NEXT_STATE to the new state
        break;

      case 'clear':
        // Set the state to an empty object (clearing it)
        NEXT_STATE = {};
        break;

      default:
        break;
    }

    // Push a fresh clone of the current state after each transformation
    FINAL_RESULT.push({ ...NEXT_STATE });
  }

  return FINAL_RESULT;
}

module.exports = transformStateWithClones;
