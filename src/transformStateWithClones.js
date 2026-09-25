'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const historyTransformState = [];
  const copyState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const extraData in action.extraData) {
        copyState[extraData] = action.extraData[extraData];
      }
      historyTransformState.push({ ...copyState });
      continue;
    }

    if (action.type === 'removeProperties') {
      for (const keysToRemove of action.keysToRemove) {
        delete copyState[keysToRemove];
      }
      historyTransformState.push({ ...copyState });
      continue;
    }

    for (const key in copyState) {
      delete copyState[key];
    }
    historyTransformState.push({ ...copyState });
  }

  return historyTransformState;
}

module.exports = transformStateWithClones;
