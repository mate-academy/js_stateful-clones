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

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        if (Array.isArray(action.keysToRemove)) {
          action.keysToRemove.forEach((key) => {
            delete currentState[key];
          });
        }
        break;
      default:
        break;
    }
    states.push({ ...currentState });
  });

  return states;
}

module.exports = transformStateWithClones;
