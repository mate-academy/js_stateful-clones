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
    if (action.type === 'addProperties') {
      const nextState = {
        ...currentState, ...action.extraData,
      };

      result.push(nextState);
      currentState = nextState;
    } else if (action.type === 'removeProperties') {
      const nextState = { ...currentState };

      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
      result.push(nextState);
      currentState = nextState;
    } else if (action.type === 'clear') {
      result.push({});
      currentState = {};
    }
  }

  return result;
}

module.exports = transformStateWithClones;
