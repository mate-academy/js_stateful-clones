'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        currentState = { ...currentState };

        action.keysToRemove.forEach((key) => {
          delete currentState[key];
        });
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
