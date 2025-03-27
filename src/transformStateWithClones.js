'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        currentState = {};
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        currentState = Object.keys(currentState)
          .filter((key) => !action.keysToRemove.includes(key))
          .reduce((newState, key) => {
            newState[key] = currentState[key];

            return newState;
          }, {});
        break;
    }
    statesHistory.push(currentState);
  });

  return statesHistory;
}

module.exports = transformStateWithClones;
