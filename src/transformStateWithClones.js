'use strict';

/**
 * @param {Object} preState
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformpreStateWithClones(state, actions) {
  // write code here
  const preState = { ...state };
  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(preState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete preState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in preState) {
        delete preState[key];
      }
    }

    result.push({ ...preState });
  }

  return result;
}
module.exports = transformpreStateWithClones;
