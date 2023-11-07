'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformState = [];
  const stateCopy = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(stateCopy, act.extraData);
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    transformState.push({ ...stateCopy });
  }

  return transformState;
}

// function transformStateWithClones(state, actions) {
//   const transformState = [];
//   const stateCopy = { ...state };

//   for (const act of actions) {
//     if (act.type === 'addProperties') {
//       Object.assign(stateCopy, act.extraData);
//     }

//     if (act.type === 'removeProperties') {
//       for (const key of act.keysToRemove) {
//         delete stateCopy[key];
//       }
//     }

//     if (act.type === 'clear') {
//       for (const key in stateCopy) {
//         delete stateCopy[key];
//       }
//     }
//     transformState.push({ ...stateCopy });
//   }

//   return transformState;
// }

module.exports = transformStateWithClones;
