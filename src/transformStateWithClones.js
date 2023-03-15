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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newObject, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newObject[key];
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
