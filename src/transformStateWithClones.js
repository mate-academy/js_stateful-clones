'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newObject = { ...state };
  const clone = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newObject[key] = action.extraData[key];
        }

        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObject[key];
        }

        break;
      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        }

        break;

      default:
        break;
    }

    clone.push({ ...newObject });
  }

  return clone;
}

module.exports = transformStateWithClones;
