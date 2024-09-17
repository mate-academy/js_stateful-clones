'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(initialState, actions) {
  const states = [];
  let state = { ...initialState };

  actions.forEach((action) => {
    let nextState = { ...state };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;
      case 'addProperties':
        nextState = { ...nextState, ...action.extraData };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          if (nextState.hasOwnProperty(key)) {
            delete nextState[key];
          }
        });
        break;
      default:
        break;
    }
    states.push(nextState);
    state = nextState;
  });

  return states;
}

module.exports = transformStateWithClones;
