'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    stateHistory.push({ ...currentState });
  }

  return stateHistory;
}

// function transformStateWithClones(state, actions) {
//   let currentState = { ...state }; // Create an initial copy of the state
//   const stateHistory = [];

//   for (const action of actions) {
//     if (action.type === 'clear') {
//       currentState = {}; // Reset state to an empty object
//     } else if (action.type === 'addProperties') {
//       currentState = { ...currentState, ...action.extraData };
//     } else if (action.type === 'removeProperties') {
//       currentState = { ...currentState }; // Clone before modifying

//       for (const key of action.keysToRemove) {
//         delete currentState[key]; // Remove specified keys
//       }
//     }

//     stateHistory.push({ ...currentState }); // Store a snapshot of the state
//   }

//   return stateHistory;
// }

module.exports = transformStateWithClones;
