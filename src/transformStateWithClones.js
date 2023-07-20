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
        Object.assign(stateCopy, action.extraData);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        } break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete stateCopy[removeKey];
        } break;

      default: continue;
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
