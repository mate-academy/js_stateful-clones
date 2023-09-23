'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [ ];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties' :
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties' :
        for (const value of keysToRemove) {
          delete stateCopy[value];
        }
        break;

      case 'clear' :
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
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
