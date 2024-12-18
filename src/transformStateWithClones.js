'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];

  let newState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete newState[key];
        });
        break;

      default:
        break;
    }

    states.push({ ...newState });
  });

  return states;
}

module.exports = transformStateWithClones;
