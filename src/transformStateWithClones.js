'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let currentState = { ...state };

  actions.forEach(action => {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        if (action.extraData) {
          Object.assign(nextState, action.extraData);
        }
        break;
      case 'removeProperties':
        if (action.keysToRemove) {
          action.keysToRemove.forEach(key => {
            if (nextState.hasOwnProperty(key)) {
              delete nextState[key];
            }
          });
        }
        break;
      case 'clear':
        nextState = {};
        break;
    }

    stateHistory.push(nextState);
    currentState = nextState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
