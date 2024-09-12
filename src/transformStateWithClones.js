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
    let newState = {};

    switch (type) {
      case 'addProperties':
        newState = {
          ...currentState, ...extraData,
        };
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    currentState = newState;

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
