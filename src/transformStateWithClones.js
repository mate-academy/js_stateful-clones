'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const arrayReturn = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete (clone[key]);
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete (clone[key]);
        }
        break;

      default:
        break;
    }
    arrayReturn.push({ ...clone });
  }

  return (arrayReturn);
}

module.exports = transformStateWithClones;
