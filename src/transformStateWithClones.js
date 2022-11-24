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

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy };
        Object.assign(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };
        obj.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        stateCopy = { };
        break;
      default:
        break;
    }
    stateHistory.push(stateCopy);
  };

  return stateHistory;
}

module.exports = transformStateWithClones;
