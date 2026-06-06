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

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const { extraData } = action;

      Object.assign(stateCopy, extraData);
      result.push({ ...stateCopy });
    }

    if (action.type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
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
