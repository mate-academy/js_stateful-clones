'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // accept undefined actions but require `state` as the first argument
  const initialState = state || {};
  let currentState = { ...initialState };

  const actionList = Array.isArray(actions) ? actions : [];

  const history = [];

  for (const action of actionList) {
    if (!action || typeof action.type !== 'string') {
      // unknown or malformed action: skip
      continue;
    }

    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...currentState, ...(action.extraData || {}) };
        break;
      case 'clear':
        nextState = {};
        break;
      case 'removeProperties':
        nextState = { ...currentState };

        for (const key of action.keysToRemove || []) {
          delete nextState[key];
        }
        break;
      default:
        // unknown action type: skip
        continue;
    }

    history.push(nextState);
    currentState = nextState;
  }

  return history;
}

module.exports = transformStateWithClones;
