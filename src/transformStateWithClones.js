'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = Object.assign({}, state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
