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
      for (const removed of action.keysToRemove) {
        delete copyState[removed];
      }
    } else if (action.type === 'clear') {
      for (const prop in copyState) {
        delete copyState[prop];
      }
    }

    result.push({ ...copyState });
  }

  return result;
}
module.exports = transformStateWithClones;
