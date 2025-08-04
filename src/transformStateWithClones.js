'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const historyChanges = [];
  const copyState = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        copyState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const keyToRemove of action.keysToRemove) {
        delete copyState[keyToRemove];
      }
    }

    if (action.type === 'clear') {
      for (const key in copyState) {
        delete copyState[key];
      }
    }

    historyChanges.push(structuredClone(copyState));
  }

  return historyChanges;
}

module.exports = transformStateWithClones;
