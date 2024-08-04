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

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        currentState = { ...currentState, ...extraData };

        break;

      case 'removeProperties':
        currentState = { ...currentState };

        for (let k = 0; k < keysToRemove.length; k++) {
          const key = keysToRemove[k];

          delete currentState[key];
        }

        break;

      case 'clear':
        currentState = {};

        break;

      default:
        continue;
    }
    states.push(currentState);
  }

  return states;
}

module.exports = transformStateWithClones;
