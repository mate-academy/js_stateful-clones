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

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);

      result.push({ ...stateCopy });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }

      result.push({ ...stateCopy });
    }

    if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }

      result.push({ ...stateCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
