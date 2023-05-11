'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

// ____________for me_____________________________________
// function transformStateWithClones(state, actions) {
//   const stateVersion = [];
//   let newState = {...state}

//   for (const action of actions) {
//     const { type, extraData, keysToRemove} = actions;

//     if (type === 'addProperties') {
//       newState = {...newState, ...extraData};
//     }

//     if (type === 'removeProperties') {
//       for (const keyToRemove of keysToRemove) {
//         delete newState[keyToRemove];
//       }
//     }

//     if {type === 'clear'} {
//       for (const keyToRemove in newState) {
//         delete newState[keyToRemove]
//       }
//     }
//   }

//   return stateVersion;

// }
// ____________for me_____________________________________

function transformStateWithClones(state, actions) {
  const stateVersion = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete newState[keyToRemove];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    stateVersion.push({ ...newState });
  }

  return stateVersion;
}

module.exports = transformStateWithClones;
