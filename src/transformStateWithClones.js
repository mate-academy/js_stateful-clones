'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = { ...state };
  const result = [];

  for (const i of actions) {
    if (i.type === 'addProperties') {
      Object.assign(newState, i.extraData);
    };

    if (i.type === 'removeProperties') {
      for (const x of i.keysToRemove) {
        delete newState[x];
      };
    };

    if (i.type === 'clear') {
      for (const j in newState) {
        delete newState[j];
      }
    };

    result.push({ ...newState });
    console.log(result)
  }

  return result;
}

// function transformStateWithClones(state, actions) {
//   // write code here
//   const clone = { ...state };
//   const clonesArray = [];

//   for (const action of actions) {
//     if (action.type === 'addProperties') {
//       Object.assign(clone, action.extraData);
//     }

//     if (action.type === 'removeProperties') {
//       for (const key of action.keysToRemove) {
//         delete clone[key];
//       }
//     }

// if (action.type === 'clear') {
//   for (const key in clone) {
//     delete clone[key];
//   }
// }

//     clonesArray.push({ ...clone });
//   }

//   return clonesArray;
// }

module.exports = transformStateWithClones;
