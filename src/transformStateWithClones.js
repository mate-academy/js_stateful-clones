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

  for (const value of actions) {
    if (value.type === 'addProperties') {
      (Object.assign(stateCopy, value.extraData));
    }

    if (value.type === 'removeProperties') {
      for (const key of value.keysToRemove) {
        delete stateCopy[key];
      }
    }

    if (value.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
