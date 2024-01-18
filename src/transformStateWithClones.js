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

    if (type === 'addProperties') {
      currentState = {
        ...currentState, ...extraData,
      };
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete currentState[key];
      }
    } else if (type === 'clear') {
      currentState = {};
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
