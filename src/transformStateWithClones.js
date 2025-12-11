'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const results = [];

  for (const action of actions) {
    if (action.type === `addProperties`) {
      const extraData = action.extraData;

      Object.assign(currentState, extraData);
    }

    if (action.type === `removeProperties`) {
      const keysToRemove = action.keysToRemove;

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }

    if (action.type === `clear`) {
      currentState = {};
    }

    results.push({ ...currentState });
  }

  return results;
}

module.exports = transformStateWithClones;
