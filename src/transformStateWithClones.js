'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const additionalData = action.extraData || {};

      const newState = { ...currentState };

      Object.assign(newState, additionalData);

      arr.push(newState);
      currentState = newState;
    }

    if (action.type === 'clear') {
      const newState = {};

      arr.push(newState);
      currentState = newState;
    }

    if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove || [];

      const newState = { ...currentState };

      for (const key of keysToRemove) {
        delete newState[key];
      }

      arr.push(newState);
      currentState = newState;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
