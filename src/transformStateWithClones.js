'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesResult = [];
  let lastState = state;

  for (const action of actions) {
    const newState = executeAction(lastState, action);

    statesResult.push(newState);
    lastState = newState;
  }

  return statesResult;
}

function executeAction(state, { type, extraData, keysToRemove }) {
  const newState = {};

  switch (type) {
    case 'addProperties':
      Object.assign(newState, state, extraData);

      return newState;

    case 'removeProperties':
      Object.assign(newState, state);

      for (const key of keysToRemove) {
        delete newState[key];
      }

      return newState;

    case 'clear':
      return {};

    default:
      return { ...state };
  }
}

module.exports = transformStateWithClones;
