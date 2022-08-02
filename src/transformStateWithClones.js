'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  const object = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(object, action.extraData);

        const copy = { ...object };

        array.push(copy);

        break;
      case 'removeProperties':
        const removeArray = action.keysToRemove;

        for (const key of removeArray) {
          if (key in object) {
            delete object[key];
          }
        }

        const copy2 = { ...object };

        array.push(copy2);

        break;
      case 'clear':
        for (const key in object) {
          delete object[key];
        }

        array.push({});

        break;

      default:
        return copy;
    }
  }

  return array;
}

module.exports = transformStateWithClones;

// if (action.type === 'addProperties') {
//   Object.assign(object, action.extraData);

//   const copy = { ...object };

//   array.push(copy);
// }

// if (action.type === 'removeProperties') {
//   const removeArray = action.keysToRemove;

//   for (const key of removeArray) {
//     if (key in object) {
//       delete object[key];
//     }
//   }

//   const copy = { ...object };

//   array.push(copy);
// }

// if (action.type === 'clear') {
//   for (const key in object) {
//     delete object[key];
//   }
//   array.push({});
// }
// }
