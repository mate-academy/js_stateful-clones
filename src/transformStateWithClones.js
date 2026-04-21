'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
      result.push(currentState);
    } else if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
      result.push(currentState);
    } else if (action.type === 'removeProperties') {
      const nextState = {};

      for (const key in currentState) {
        if (!action.keysToRemove.includes(key)) {
          nextState[key] = currentState[key];
        }
      }

      currentState = nextState;
      result.push(currentState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
