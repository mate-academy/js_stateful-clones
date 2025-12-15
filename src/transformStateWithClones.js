'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = {};
  const stateHistory = [];

  Object.assign(prevState, state);

  for (const action of actions) {
    let nextState = {};

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, prevState, action.extraData);
        break;

      case 'removeProperties':
        Object.assign(nextState, prevState);

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }
    stateHistory.push(nextState);
    prevState = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
