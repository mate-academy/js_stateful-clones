'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(stateCopy, key.extraData);
        break;

      case 'removeProperties':
        for (const value of key.keysToRemove) {
          delete stateCopy[value];
        };
        break;

      case 'clear':
        for (const keys in stateCopy) {
          delete stateCopy[keys];
        }
        break;

      default:
        throw Error('Uknown action type');
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
