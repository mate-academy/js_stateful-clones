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

  for (const action of actions) {
    let stateCopy;

    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...currentState };
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        stateCopy = { ...currentState };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        stateCopy = { ...currentState };
        break;
    }

    stateHistory.push(stateCopy);
    currentState = stateCopy;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
