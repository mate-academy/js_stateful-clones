'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    let nextState;

    switch (action.type) {
      case 'addProperties':
        nextState = { ...stateCopy, ...action.extraData };
        // Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        nextState = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete nextState[key];
        }
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        break;
    }
    stateHistory.push(nextState);
    stateCopy = nextState;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
