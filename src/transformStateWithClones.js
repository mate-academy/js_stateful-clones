'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateAtTheMoment = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    let stateCopy = { ...stateAtTheMoment };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      default:
        return 'error';
    }

    stateHistory.push(stateCopy);
    stateAtTheMoment = stateCopy;
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
