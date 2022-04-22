'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const results = [];

  for (const act of actions) {
    const { type, extraData, keysToRemove } = act;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        results.push({ ...stateCopy });
        break;

      case 'removeProperties':
        for (const i of keysToRemove) {
          delete stateCopy[i];
        }
        results.push({ ...stateCopy });
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        results.push({ ...stateCopy });
        break;

      default:
        results.push('action does not exist');
    }
  }

  return results;
}

module.exports = transformStateWithClones;
