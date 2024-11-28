'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let initialState = { ...state };
  const states = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        initialState = {};
        break;

      case 'addProperties':
        initialState = { ...initialState, ...action.extraData };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete initialState[key];
        });
        break;

      default:
        break;
    }

    states.push({ ...initialState });
  });

  return states;
}

module.exports = transformStateWithClones;
