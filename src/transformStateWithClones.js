'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state };

  actions.forEach((action) => {
    currentState = { ...currentState };

    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
      stateHistory.push({ ...currentState });
    }

    if (action.type === 'removeProperties' && action.keysToRemove) {
      action.keysToRemove.forEach((key) => {
        delete currentState[key];
      });
      stateHistory.push({ ...currentState });
    }

    if (action.type === 'clear') {
      currentState = {};
      stateHistory.push({ ...currentState });
    }
  });

  return stateHistory;
}

module.exports = transformStateWithClones;

// 'use strict';

// /**
//  * @param {Object} state
//  * @param {Object[]} actions
//  *
//  * @return {Object[]}
//  */

// function transformStateWithClones(state, actions) {
//   const stateHistory = [];
//   let currentState = { ...state };

//   for (const action of actions) {
//     switch (action.type) {
//       case 'clear':
//         currentState = {};
//         break;

//       case 'addProperties':
//         currentState = { ...currentState, ...action.extraData };
//         break;

//       case 'removeProperties':
//         const { keysToRemove } = action;

//         currentState = { ...currentState };

//         for (const key of keysToRemove) {
//           delete currentState[key];
//         }
//         break;

//       default:
//         throw new Error(`Unknown action type: ${action.type}`);
//     }

//     stateHistory.push({ ...currentState });
//   }

//   return stateHistory;
// }

// module.exports = transformStateWithClones;
