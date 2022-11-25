'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        stateCopy = { };
        break;
      default:
        throw new Error(action.type
          ? `${action.type} is not supported`
          : `Action is ${action.type}`);
    }
    stateHistory.push({ ...stateCopy });
  };

  return stateHistory;
}

module.exports = transformStateWithClones;
