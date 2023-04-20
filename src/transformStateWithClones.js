'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let previousState = { ...state };

  for (const action of actions) {
    const newState = transform(previousState, action);

    previousState = newState;
    stateHistory.push({ ...newState });
  }

  return stateHistory;
}

function transform(state, action) {
  switch (action.type) {
    case 'addProperties':
      return {
        ...state,
        ...action.extraData,
      };

    case 'removeProperties':
      const newState = { ...state };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      return newState;

    case 'clear':
      return {};

    default:
      throw new Error(`Unknown action type: "${action.type}"`);
  }
}

module.exports = transformStateWithClones;
