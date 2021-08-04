'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const tempState = { ...state };
  const previousVersions = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(tempState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (let j = 0; j < action.keysToRemove.length; j++) {
        for (const key in tempState) {
          if (key === action.keysToRemove[j]) {
            delete tempState[key];
          }
        }
      }
    } else {
      for (const key in tempState) {
        delete tempState[key];
      }
    }
    // previousVersions[action] = tempState;
    // tempState = { ...previousVersions[action] };
    previousVersions.push({ ...tempState });
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
