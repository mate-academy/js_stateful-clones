'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   const result = [];
//   let currentState = Object.assign({}, state);

//   actions.forEach((action) => {
//     const newState = Object.assign({}, currentState);

//     switch (action.type) {
//       case 'addProperties':
//         if (action.extraData && typeof action.extraData === 'object') {
//           Object.assign(newState, action.extraData);
//         }
//         break;
//       case 'removeProperties':
//         if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
//           action.keysToRemove.forEach((key) => {
//             if (newState.hasOwnProperty(key)) {
//               delete newState[key];
//             }
//           });
//         }
//         break;
//       case 'clear':
//         newState = {};
//         break;
//       default:
//         break;
//     }

//     result.push(newState);
//     currentState = newState;
//   });

//   return result;
// }

function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = Object.assign({}, state);

  actions.forEach((action) => {
    let newState = Object.assign({}, currentState);

    switch (action.type) {
      case 'addProperties':
        if (action.extraData && typeof action.extraData === 'object') {
          Object.assign(newState, action.extraData);
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove && Array.isArray(action.keysToRemove)) {
          action.keysToRemove.forEach((key) => {
            if (newState.hasOwnProperty(key)) {
              delete newState[key];
            }
          });
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    result.push(Object.assign({}, newState));
    currentState = newState;
  });

  return result;
}

module.exports = transformStateWithClones;
