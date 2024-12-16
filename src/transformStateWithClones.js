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
  const stateCopy = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        stateCopy[key] = action.extraData[key];
      }
      result.push({ ...stateCopy });
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      }
      result.push({ ...stateCopy });
    } else if (action.type === 'clear') {
      for (const key in stateCopy) {
        delete stateCopy[key];
      }
      result.push({ ...stateCopy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
