'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let cloneState = JSON.parse(JSON.stringify(state));

  actions.forEach((action) => {
    const nextState = JSON.parse(JSON.stringify(cloneState));

    switch (action.type) {
      case 'clear':
        Object.keys(nextState).forEach((key) => delete nextState[key]);
        break;
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;
      default:
        break;
    }

    stateHistory.push(nextState);
    cloneState = nextState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
