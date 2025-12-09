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
      break;

    case 'removeProperties':
      Object.assign(newState, state);

      for (const key of keysToRemove) {
        delete newState[key];
      }
      break;

    case 'clear':
      break;

    default:
      Object.assign(newState, state);
  }

  return newState;
}

module.exports = transformStateWithClones;
