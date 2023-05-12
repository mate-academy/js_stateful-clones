'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const data in action.extraData) {
        copyState[data] = action.extraData[data];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copyState[key];
      }
    }

    if (action.type === 'clear') {
      for (const part in copyState) {
        delete copyState[part];
      }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
