'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = { ...state };

  for (const action of actions) {
    let nextState = { ...copyState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete nextState[property];
        }
        break;

      default:
        throw new Error('Unexpected action');
    }

    stateHistory.push({ ...nextState });
    copyState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
