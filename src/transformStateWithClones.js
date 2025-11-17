'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        clonedState = { ...clonedState, ...action.extraData };
        stateHistory.push(clonedState);
        break;
      case 'removeProperties':
        clonedState = { ...clonedState };
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        stateHistory.push(clonedState);
        break;
      case 'clear':
        clonedState = {};
        stateHistory.push(clonedState);
        break;
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
