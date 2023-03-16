'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action['extraData']) {
          stateCopy[key] = action['extraData'][key];
        };
        break;

      case 'removeProperties':
        for (const removeKey of action['keysToRemove']) {
          delete stateCopy[removeKey];
        };
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;

      default:
        throw new Error(`Input is invalid - ${action.type}`);
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
