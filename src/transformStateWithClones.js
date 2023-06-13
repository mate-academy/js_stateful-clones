'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
// function transformStateWithClones(state, actions) {
//   for (const action in actions) {
//     switch (action.type) {
//       case ('addProperties') :
//         const extraData = action.extraData;

//         for (const key in extraData) {
//           state[key] = extraData[key];
//         }
//         break;

//       case ('removeProperties') :
//         const keysToRemove = action.keysToRemove;

//         for (const key in keysToRemove) {
//           if (state.hasOwn('key')) {
//             delete state[key];
//           }
//         }
//         break;

//       case ('clear') :
//         for (const key in state) {
//           delete state[key];
//         }
//         break;
//     }
//   }
// }
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState, ...extraData,
        };
        break;

      case 'removeProperties':
        const updatedState = { ...currentState };

        for (const key of keysToRemove) {
          delete updatedState[key];
        }

        currentState = updatedState;
        break;

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Action error with ${type}`);
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
