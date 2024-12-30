'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateHistory = { ...state };
  const states = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateHistory, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateHistory[key];
      }
    } else if (action.type === 'clear') {
      stateHistory = {};
    }

    states.push({ ...stateHistory });
  }

  return states;
}

module.exports = transformStateWithClones;
