'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        clone[data] = action.extraData[data];
      }
    } else if (action.type === 'removeProperties') {
      for (const data of action.keysToRemove) {
        delete clone[data];
      }
    } else if (action.type === 'clear') {
      for (const data in clone) {
        delete clone[data];
      }
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
