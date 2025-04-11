'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let nextState;

    if (action.type === 'clear') {
      nextState = {};
    }

    if (action.type === 'addProperties') {
      nextState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      nextState = { ...currentState };

      for (const key of action.keysToRemove || []) {
        delete nextState[key];
      }
    }

    if (
      action.type !== 'clear' &&
      action.type !== 'addProperties' &&
      action.type !== 'removeProperties'
    ) {
      nextState = { ...currentState };
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
