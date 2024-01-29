'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformState(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformState;

// for (const a of actions) {
//   if (a.type === 'addProperties') {
//     Object.assign(stateClone, a.extraData);
//     result.push({ ...stateClone });
//   }

//   if (a.type === 'removeProperties') {
//     for (const b of a.keysToRemove) {
//       delete stateClone[b];
//     }
//     result.push({ ...stateClone });
//   }

//   if (a.type === 'clear') {
//     stateClone = {};
//     result.push({ ...stateClone });
//   }
// }

// return result;
