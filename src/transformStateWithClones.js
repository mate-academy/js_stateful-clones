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
  let stateCopy = {};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(object, action.extraData);

        stateCopy = { ...object };

        break;
      case 'removeProperties':
        const removeArray = action.keysToRemove;

        for (const key of removeArray) {
          if (key in object) {
            delete object[key];
          }
        }

        stateCopy = { ...object };

        break;
      case 'clear':
        for (const key in object) {
          delete object[key];
        }

        stateCopy = { ...object };
        break;

      default:
        array.push(stateCopy);
    }
    array.push(stateCopy);
  }

  return array;
}

module.exports = transformStateWithClones;
