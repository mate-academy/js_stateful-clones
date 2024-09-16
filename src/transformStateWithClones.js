'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        const extraData = action.extraData;

        newState = {
          ...newState, ...extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...newState };

        const keysToRemove = action.keysToRemove;

        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;

      default:
        break;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;

// const result = [];
// let newState = { ...state };

// for (const action of actions) {
//   if (action.type === 'addProperties') {
//     const extraData = action.extraData;

//     for (const key in extraData) {
//       newState[key] = extraData[key];
//     }
//   }
// }

// for (const action of actions) {
//   if (action.type === 'removeProperties') {
//     const keysToRemove = action.keysToRemove;

//     for (const key of keysToRemove) {
//       delete newState[key];
//     }
//   }
// }

// for (const action of actions) {
//   if (action.type === 'clear') {
//     newState = {};
//   }
// }
// result.push(newState);

// return result;
