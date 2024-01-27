'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const action of actions) {
    let newState;
    const lastState = stateHistory[stateHistory.length - 1];

    newState = JSON.parse(JSON.stringify(lastState || state));

    switch (action.type) {
      case 'clear':
        newState = {};
        break;
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        });
        break;
    }

    stateHistory.push(newState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
