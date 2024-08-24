'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let initialState = { ...state };

  for (const action of actions) {
    let newState = { ...initialState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        return 'unexpected action.type value';
    }

    stateHistory.push(newState);
    initialState = newState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
