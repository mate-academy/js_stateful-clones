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

    if (action.type === 'clear') {
      nextState = {};
    } else if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete nextState[key]);
    }

    history.push(nextState);
    currentState = nextState;
  });

  return history;
}

module.exports = transformStateWithClones;
