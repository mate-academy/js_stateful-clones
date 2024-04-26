'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clonedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clonedState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete clonedState[key];
      }
    } else if (action.type === 'clear') {
      clonedState = {};
    }

    stateHistory.push({ ...clonedState });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
