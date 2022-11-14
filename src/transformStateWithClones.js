'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const i of action.keysToRemove) {
        if (copyState.hasOwnProperty(i)) {
          delete copyState[i];
        }
      }
    } else if (action.type === 'clear') {
      for (const i in copyState) {
        delete copyState[i];
      }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
