'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = JSON.parse(JSON.stringify(state));

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete currentState[key];
      }
    }
    stateHistory.push(JSON.parse(JSON.stringify(currentState)));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
