'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const lastState = stateHistory[stateHistory.length - 1];

    const newState = makeAction({ ...(lastState || state) }, action);

    stateHistory.push(newState);
  }

  return stateHistory;
}

function makeAction(state, action) {
  switch (action.type) {
    case 'addProperties':
      Object.assign(state, action.extraData);

      return state;

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete state[key];
      }

      return state;

    case 'clear':
      return {};

    default:
      return state;
  }
}

module.exports = transformStateWithClones;
