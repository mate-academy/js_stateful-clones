'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        stateHistory.push({ ...cloneState });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete cloneState[key]);
        stateHistory.push({ ...cloneState });
        break;
      case 'clear':
        cloneState = {};
        stateHistory.push({ ...cloneState });
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
