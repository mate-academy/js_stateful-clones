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

  actions.forEach((action) => {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        nextState = {};
        break;

      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;

      default:
        break;
    }

    history.push(nextState);
    currentState = nextState;
  });

  return history;
}

module.exports = transformStateWithClones;
