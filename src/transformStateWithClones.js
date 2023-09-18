'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const changesArray = [];

  for (const deed of actions) {
    switch (deed.type) {
      case 'addProperties':
        for (const key in deed.extraData) {
          stateCopy[key] = deed.extraData[key];
        };
        break;

      case 'removeProperties':
        for (let j = 0; j < deed.keysToRemove.length; j++) {
          delete stateCopy[deed.keysToRemove[j]];
        };
        break;

      case 'clear':
        for (const lock in stateCopy) {
          delete stateCopy[lock];
        };
        break;
      default:
        throw new Error('invalid action type');
    }

    changesArray.push({ ...stateCopy });
  }

  return changesArray;
}

module.exports = transformStateWithClones;
