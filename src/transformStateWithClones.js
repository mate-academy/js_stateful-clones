'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newObject = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        const { extraData } = object;

        for (const key in extraData) {
          newObject[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        const { keysToRemove } = object;

        for (let i = 0; i < keysToRemove.length; i++) {
          delete newObject[keysToRemove[i]];
        }
        break;

      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        }
        break;

      default:
        throw new Error('unknown action type');
    }

    result.push({ ...newObject });
  }

  return result;
}

module.exports = transformStateWithClones;
