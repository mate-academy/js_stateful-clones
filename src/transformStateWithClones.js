'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const changedStates = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(newState, extraData);
    }

    if (type === 'removeProperties') {
      for (const keyToRemove of keysToRemove) {
        delete newState[keyToRemove];
      }
    }

    if (type === 'clear') {
      newState = {};
    }

    changedStates.push({ ...newState });
  }

  return changedStates;
}

module.exports = transformStateWithClones;
