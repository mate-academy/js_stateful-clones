'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const a of actions) {
    if (a.type === 'clear') {
      currentState = {};
    }

    if (a.type === 'addProperties') {
      currentState = { ...currentState, ...a.extraData };
    }

    if (a.type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of a.keysToRemove) {
        delete currentState[key];
      }
    }
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
