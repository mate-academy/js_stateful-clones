'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const historyState = [];
  let currentState = { ...state };

  actions.forEach(action => {
    if (action.type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        if (key in currentState) {
          delete currentState[key];
        }
      }
    }

    if (action.type === 'clear') {
      currentState = {};
    }

    historyState.push({ ...currentState });
  });

  return historyState;
}

module.exports = transformStateWithClones;
