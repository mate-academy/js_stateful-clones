'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyOfState = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        copyOfState[key] = action.extraData[key];
      }
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (copyOfState.hasOwnProperty(key)) {
          delete copyOfState[key];
        }
      }
    }

    if (action.type === 'clear') {
      if (Object.keys(copyOfState).length !== 0) {
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
      }
    }

    states.push({ ...copyOfState });
  }

  return states;
}

module.exports = transformStateWithClones;
