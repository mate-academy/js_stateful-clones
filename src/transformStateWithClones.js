'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'clear') {
      currentState = {};
    }

    if (actions[i].type === 'addProperties') {
      currentState = { ...currentState, ...actions[i].extraData };
    }

    if (actions[i].type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of actions[i].keysToRemove) {
        delete currentState[key];
      }
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
