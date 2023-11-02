'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const stateCopy = { ...state };

  for (const a of actions) {
    switch (a.type) {
      case 'addProperties':
        Object.assign(stateCopy, a.extraData);
        break;

      case 'removeProperties':
        for (const d of a.keysToRemove) {
          delete stateCopy[d];
        }
        break;

      case 'clear':
        for (const d in stateCopy) {
          delete stateCopy[d];
        }
        break;

      default:
        throw new Error('Unknown action');
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
