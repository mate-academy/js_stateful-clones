'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  let currentState = { ...state };

  for (const object of actions) {
    const { type, extraData = {}, keysToRemove = [] } = object;

    if (type === 'addProperties') {
      currentState = { ...currentState, ...extraData };
    }

    if (type === 'removeProperties') {
      currentState = { ...currentState };

      for (const key of keysToRemove) {
        delete currentState[key];
      }
    }

    if (type === 'clear') {
      currentState = {};
    }
    clone.push(currentState);
  }

  return clone;
}
module.exports = transformStateWithClones;
