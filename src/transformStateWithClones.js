'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let nextState;

  for (const action of actions) {
    const prevState = stateHistory[stateHistory.length - 1] || state;

    nextState = modifyState(prevState, action);

    stateHistory.push(nextState);
  }

  return stateHistory;
}

function modifyState(state, action) {
  switch (action.type) {
    case 'addProperties':
      return { ...state, ...action.extraData };

    case 'removeProperties':
      const newState = { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      return newState;

    case 'clear':
      return {};

    default:
      throw new Error('Undefined action type!');
  }
}

module.exports = transformStateWithClones;
