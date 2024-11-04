'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const i of actions) {
    currentState = { ...currentState };

    if (i.type === 'addProperties') {
      Object.assign(currentState, i.extraData);
    }

    if (i.type === 'removeProperties') {
      for (const key of i.keysToRemove) {
        delete currentState[key];
      }
    }

    if (i.type === 'clear') {
      currentState = {};
    }
    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
