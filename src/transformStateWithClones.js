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
    if (action.type === 'clear') {
      for (const key of Object.keys(copyState)) {
        delete copyState[key];
      }
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (copyState[key]) {
          delete copyState[key];
        }
      }
    } else if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
