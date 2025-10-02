'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  for (const value of actions) {
    if (value.type === 'addProperties') {
      currentState = { ...currentState, ...value.extraData };
    }

    if (value.type === 'removeProperties') {
      for (const i of value.keysToRemove) {
        delete currentState[i];
      }
    }

    if (value.type === 'clear') {
      currentState = {};
    }

    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
