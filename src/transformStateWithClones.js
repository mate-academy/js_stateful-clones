'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateFirstCopy = Object.assign({}, state);

  for (const action of actions) {
    const newState = transformState(stateFirstCopy, action);

    stateFirstCopy = newState;
    stateHistory.push(Object.assign({}, newState));
  }

  return stateHistory;
}

function transformState(state, action) {
  switch (action.type) {
    case 'addProperties':
      return {
        ...state,
        ...action.extraData,
      };
    case 'removeProperties':
      const newState = Object.assign({}, state);

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
