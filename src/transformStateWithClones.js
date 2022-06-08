'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const prevVersions = [];
  let stateCopy = { ...state };

  for (const object of actions) {
    const { type, extraData, keysToRemove } = object;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'Wrong input';
    }

    prevVersions.push({ ...stateCopy });
  }

  return prevVersions;
}

module.exports = transformStateWithClones;
