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
  const copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copyState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const keyRemove of action.keysToRemove) {
        delete copyState[keyRemove];
      }
    } else {
      for (const key in copyState) {
        delete copyState[key];
      }
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
