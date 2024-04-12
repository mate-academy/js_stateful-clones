'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  actions.forEach((action) => {
    const newState = { ...currentState };

    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    } else if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((key) => {
        if (newState.hasOwnProperty(key)) {
          delete newState[key];
        }
      });
    }

    result.push(newState);
    currentState = newState;
  });

  return result;
}

module.exports = transformStateWithClones;
