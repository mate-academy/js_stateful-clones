'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  actions.forEach(action => {
    let nextState;

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        nextState = {
          ...currentState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        nextState = { ...currentState };
        action.keysToRemove.forEach(key => {
          delete nextState[key];
        });
        break;

      default:
        nextState = { ...currentState };
    }

    history.push(nextState);
    currentState = nextState;
  });

  return history;
}

module.exports = transformStateWithClones;
