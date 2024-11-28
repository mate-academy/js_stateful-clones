'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneState = { ...cloneState, ...action.extraData };
        stateHistory.push({ ...cloneState });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        stateHistory.push(cloneState);
        break;

      case 'clear':
        cloneState = {};
        stateHistory.push(cloneState);
        break;
      default:
        return;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
