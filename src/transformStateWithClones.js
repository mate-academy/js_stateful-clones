'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = structuredClone(state);
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        transformedState[key] = actions[i].extraData[key];
      }
    } else if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete transformedState[key];
      }
    } else {
      for (const key in transformedState) {
        delete transformedState[key];
      }
    }

    stateHistory.push(structuredClone(transformedState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
