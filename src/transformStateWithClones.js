'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changesArray = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    }

    if (action.type === 'addProperties') {
      currentState = { ...currentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      const { keysToRemove } = action;

      currentState = { ...currentState };

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }

    changesArray.push({ ...currentState });
  }

  return changesArray;
}

module.exports = transformStateWithClones;
