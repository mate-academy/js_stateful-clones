'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(initialState, actions) {
  const states = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      const properties = action.extraData;

      for (const key in properties) {
        currentState[key] = properties[key];
      }
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove;

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    } else if (action.type === 'clear') {
      currentState = {};
    }

    states.push({ ...currentState });
  }

  return states;
}

module.exports = transformStateWithClones;
