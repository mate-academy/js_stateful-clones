'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = structuredClone(state);
  let next;

  for (const action of actions) {
    if (action.type === 'clear') {
      next = {};
    } else if (action.type === 'addProperties') {
      next = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      next = { ...currentState };

      for (const key of action.keysToRemove) {
        delete next[key];
      }
    }
    results.push(next);
    currentState = next;
  }

  return results;
}

module.exports = transformStateWithClones;
