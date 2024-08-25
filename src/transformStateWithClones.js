'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {{}}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const states = [];

  actions.forEach((action) => {
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
  });

  return states;
}

module.exports = transformStateWithClones;
