'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const history = [];

  actions.forEach((action) => {
    let nextState = { ...currentState };

    if (action.type === 'clear') {
      nextState = {};
    }

    if (action.type === 'addProperties') {
      nextState = { ...nextState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        delete nextState[key];
      });
    }

    history.push(nextState);
    currentState = nextState;
  });

  return history;
}

module.exports = transformStateWithClones;
