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

  for (const key of actions) {
    if (key.type === 'addProperties') {
      Object.assign(stateCopy, key.extraData);
    } else if (key.type === 'removeProperties') {
      for (const value of key.keysToRemove) {
        delete stateCopy[value];
      }
    } else if (key.type === 'clear') {
      for (const value in stateCopy) {
        delete stateCopy[value];
      }
    }

    result.push({ ...stateCopy });
  }

  return result;
}
module.exports = transformStateWithClones;
