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
    const nextState = { ...currentState };

    switch (action.type) {
      case 'clear':
        for (const key in nextState) {
          delete nextState[key];
        }
        break;
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete nextState[key]);
        break;
    }

    stateHistory.push(nextState);
    currentState = nextState;
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
