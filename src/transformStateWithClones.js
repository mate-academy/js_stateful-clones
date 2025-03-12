'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };

  function transformState(initialState, action) {
    let transformedState = { ...initialState };

    if (action.type === 'addProperties') {
      transformedState = { ...transformedState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => delete transformedState[key]);
    } else if (action.type === 'clear') {
      return {};
    }

    return transformedState;
  }

  return actions.map((action) => {
    currentState = transformState(currentState, action);

    return currentState;
  });
}

module.exports = transformStateWithClones;
