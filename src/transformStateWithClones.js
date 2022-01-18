'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const statesArray = [];
  const tempState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        tempState[key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      for (const n of actions[i].keysToRemove) {
        delete tempState[n];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in tempState) {
        delete tempState[key];
      }
    }
    statesArray.push({ ...tempState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
