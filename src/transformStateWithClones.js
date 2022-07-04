'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObj = { ...state };
  const result = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        for (const keys in extraData) {
          newObj[keys] = extraData[keys];
        }

        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (key in newObj) {
            delete newObj[key];
          }
        }

        break;

      case 'clear':
        for (const deleted in newObj) {
          delete newObj[deleted];
        }

        break;

      default:
        break;
    }

    result.push({ ...newObj });
  }

  return result;
}

// function transformStateWithClones(state, actions) {
//   const result = [];
//   const newObj = { ...state };

//   for (let i = 0; i < actions.length; i++) {
//     if (actions[i]['extraData']) {
//       for (const keys in actions[i]['extraData']) {
//         newObj[keys] = actions[i]['extraData'][keys];
//       }
//     } else if (actions[i]['keysToRemove']) {
//       for (const values of actions[i]['keysToRemove']) {
//         delete newObj[values];
//       }
//     } else if (actions[i]['type'] === 'clear') {
//       for (const deleted in newObj) {
//         delete newObj[deleted];
//       }
//     }
//     result.push({ ...newObj });
//   }

//   return result;
// }

module.exports = transformStateWithClones;
