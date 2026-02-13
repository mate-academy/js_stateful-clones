'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newState[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
      default:
        return 'Error';
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}
module.exports = transformStateWithClones;

//   for (const action of actions) {
//     const newState = { ...currentState };
//
//     if (action.type === 'addProperties') {
//       for (const key in action.extraData) {
//         newState[key] = action.extraData[key];
//       }
//     }
//
//     if (action.type === 'removeProperties') {
//       for (const key of action.keysToRemove) {
//         newState[key] = action.keysToRemove[key];
//       }
//     }
//
//     if (action.type === 'clear') {
//       for (const key in newState) {
//         delete newState[key];
//       }
//     }
//
//     result.push(newState);
//     currentState = newState;
//   }
//
//   return result;
//
