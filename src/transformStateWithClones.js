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

  for (const ch of actions) {
    const clonedState = { ...currentState };

    if (ch.type === 'addProperties') {
      for (const [key, value] of Object.entries(ch.extraData)) {
        clonedState[key] = value;
      }
    }

    if (ch.type === 'removeProperties') {
      for (const key of ch.keysToRemove) {
        delete clonedState[key];
      }
    }

    if (ch.type === 'clear') {
      for (const key in clonedState) {
        delete clonedState[key];
      }
    }

    result.push(clonedState);
    currentState = clonedState;
  }

  return result;
}

module.exports = transformStateWithClones;
