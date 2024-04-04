'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        nextState = Object.assign({}, state, action.extraData);
        break;
      case 'removeProperties':
        nextState = Object.assign({}, state);
        // eslint-disable-next-line prettier/prettier
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;
    }

    // eslint-disable-next-line no-param-reassign
    state = nextState;
    stateHistory.push(nextState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
