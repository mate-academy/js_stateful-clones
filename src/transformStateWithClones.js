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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let newState;

    if (type === 'addProperties') {
      newState = {
        ...currentState, ...extraData,
      };
    } else if (type === 'removeProperties') {
      newState = { ...currentState };

      for (const key of keysToRemove) {
        delete newState[key];
      }
    } else if (type === 'clear') {
      newState = {};
    }
    currentState = newState;
    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
