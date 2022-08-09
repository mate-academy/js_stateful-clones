'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        stateHistory.push({ ...newState });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        stateHistory.push({ ...newState });
        break;
      default:
        for (const key in newState) {
          delete newState[key];
        }
        stateHistory.push({});
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
