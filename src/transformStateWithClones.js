'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const currentState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i]['type'] === 'addProperties') {
      Object.assign(currentState, actions[i]['extraData']);
    }

    if (actions[i]['type'] === 'removeProperties') {
      for (const key of actions[i]['keysToRemove']) {
        delete currentState[key];
      }
    }

    if (actions[i]['type'] === 'clear') {
      for (const key in currentState) {
        delete currentState[key];
      }
    }

    result[i] = Object.assign({}, currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
