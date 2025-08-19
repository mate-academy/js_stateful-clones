'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let latestState = { ...state };

  for (const action of actions) {
    let stateCopy = { ...latestState };

    switch (action.type) {
      case 'addProperties':
        for (const key of Object.keys(action.extraData)) {
          stateCopy[key] = action.extraData[key];
        }

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error('Uknown action type: ' + action.type);
    }

    latestState = stateCopy;

    stateHistory.push(stateCopy);
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
