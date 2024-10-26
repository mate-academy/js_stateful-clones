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

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      currentState = { ...currentState, ...actions[i].extraData };

      result.push(currentState);
    }

    if (actions[i].type === 'removeProperties') {
      const newState = { ...currentState };

      for (const property of actions[i].keysToRemove) {
        delete newState[property];
      }
      currentState = newState;
      result.push(currentState);
    }

    if (actions[i].type === 'clear') {
      currentState = {};
      result.push(currentState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
