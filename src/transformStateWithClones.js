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

    if (action.type === 'clear') {
      newState = {};
    } else {
      const lastState = stateHistory[stateHistory.length - 1];

      newState = JSON.parse(JSON.stringify(lastState || state));
    }

    switch (action.type) {
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
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }

    stateHistory.push(newState);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
