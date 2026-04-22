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
    let newState;

    if (action.type === 'clear') {
      newState = {};
    }

    if (action.type === 'addProperties') {
      newState = {
        ...currentState,
        ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      newState = { ...currentState };

      action.keysToRemove.forEach((key) => {
        delete newState[key];
      });
    }

    history.push(newState);
    currentState = newState;
  });

  return history;
}

module.exports = transformStateWithClones;
