'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneArray = [];
  const cloneObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in cloneObject) {
            delete cloneObject[key];
          }
        }
        break;

      case 'clear':
        for (const key in cloneObject) {
          delete cloneObject[key];
        }
        break;

      default:
        throw new Error('unknown action type');
    }

    cloneArray.push({ ...cloneObject });
  }

  return cloneArray;
}

module.exports = transformStateWithClones;
