'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  // 1. Clone the state object
  // 2. Iterate over the actions array
  // 3. For each action, clone the state object and apply the action
  // 4. Push the cloned state object to the result array
  // 5. Return the result array
  let newState = { ...state };
  const result = [];

  if (newState === undefined) {
    newState = {};
  }

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        newState = { ...newState, ...obj.extraData };
        break;
      case 'removeProperties':
        newState = { ...newState };

        for (const toRemove of obj.keysToRemove) {
          delete newState[toRemove];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${obj.type}`);
    }

    // Push the cloned state object to the result array
    result.push({ ...newState });

  }

  return result;
}

module.exports = transformStateWithClones;

