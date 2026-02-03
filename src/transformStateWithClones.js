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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'clear') {
      currentState = {};
    } else if (type === 'addProperties') {
      currentState = { ...currentState, ...extraData };
    } else if (type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }
    history.push(currentState);
  }

  return history;
}

module.exports = transformStateWithClones;
