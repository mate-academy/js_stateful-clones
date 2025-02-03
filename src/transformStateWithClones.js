'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const result = [];

  for (const i of actions) {
    let newState = { ...currentState };

    if (i.type === 'addProperties') {
      Object.assign(newState, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const j of i.keysToRemove) {
        delete newState[j];
      }
    }

    if (i.type === 'clear') {
      newState = {};
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
