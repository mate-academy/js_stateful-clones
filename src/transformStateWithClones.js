'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let tempState = { ...state };
  const previousVersions = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(tempState, actions[i].extraData);
    } else if (actions[i].type === 'removeProperties') {
      for (let j = 0; j < actions[i].keysToRemove.length; j++) {
        for (const key in tempState) {
          if (key === actions[i].keysToRemove[j]) {
            delete tempState[key];
          }
        }
      }
    } else {
      for (const key in tempState) {
        delete tempState[key];
      }
    }
    previousVersions[i] = tempState;
    tempState = { ...previousVersions[i] };
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
