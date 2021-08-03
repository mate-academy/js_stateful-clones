'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (const keys in action.keysToRemove) {
          delete clonedState[action.keysToRemove[keys]];
        };
        break;

      case 'clear':
        for (const properties in clonedState) {
          delete clonedState[properties];
        };
        break;
    }

    stateHistory.push({ ...clonedState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
