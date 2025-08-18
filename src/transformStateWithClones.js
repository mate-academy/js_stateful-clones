'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statestHistory = [];
  let latestState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    let updatedState = { ...latestState };

    if (actions[i].type === 'addProperties') {
      for (const key of Object.keys(actions[i].extraData)) {
        updatedState[key] = actions[i].extraData[key];
      }
      latestState = updatedState;
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete updatedState[key];
      }
      latestState = updatedState;
    }

    if (actions[i].type === 'clear') {
      updatedState = {};
      latestState = updatedState;
    }
    statestHistory.push(updatedState);
  }

  return statestHistory;
}

module.exports = transformStateWithClones;
