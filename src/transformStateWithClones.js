'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of keysToRemove) {
          delete currentState[key];
        }
        break;
      case 'clear':
        currentState = {};
        break;
      default:
        break;
    }
    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
