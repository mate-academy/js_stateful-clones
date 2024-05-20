'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;
      default:
        throw new Error('Unexpected action type');
    }

    stateHistory.push(nextState);
    currentState = { ...nextState };
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
