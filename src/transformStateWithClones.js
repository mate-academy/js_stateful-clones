'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const types of actions) {
    switch (types.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, types.extraData);
        break;

      case 'removeProperties':
        for (const value of types.keysToRemove) {
          delete stateCopy[value];
        }
        break;

      default:
        break;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
