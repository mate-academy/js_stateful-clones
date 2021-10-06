'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   const versionsOfState = [];
//   const copyState = { ...state };

//   for (const obj of actions) {
//     for (const key in obj) {
//       if (key === 'extraData') {
//         for (const keyIn in obj[key]) {
//           copyState[keyIn] = obj[key][keyIn];
//         }

//         versionsOfState.push({ ...copyState });
//       }

//       if (key === 'keysToRemove') {
//         for (const keyIn of obj[key]) {
//           delete copyState[keyIn];
//         }

//         versionsOfState.push({ ...copyState });
//       }

//       if (key === 'type' && obj[key] === 'clear') {
//         for (const keyIn in copyState) {
//           delete copyState[keyIn];
//         }

//         versionsOfState.push({ ...copyState });
//       }
//     }
//   }

//   return versionsOfState;
// }

function transformStateWithClones(state, actions) {
  const versionsOfState = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const keyToAdd in action.extraData) {
          copyState[keyToAdd] = action.extraData[keyToAdd];
        }

        versionsOfState.push({ ...copyState });

        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        }

        versionsOfState.push({ ...copyState });

        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }

        versionsOfState.push({ ...copyState });

        break;

      default:
    }
  }

  return versionsOfState;
}

module.exports = transformStateWithClones;
