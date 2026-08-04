'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = Object.assign({}, currentState, action.extraData);
        break;

      case 'clear':
        currentState = {};
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }

        break;
    }

    stateHistory.push(currentState);
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
