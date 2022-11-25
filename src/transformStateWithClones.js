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
    stateCopy = { ...stateCopy };

    switch (obj.type) {
      case 'addProperties':
        Object.assign(stateCopy, obj.extraData);
        break;
      case 'removeProperties':
        obj.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        stateCopy = { };
        break;
      default:
        throw new Error(obj.type
          ? `${obj.type} is not supported`
          : `Action is ${obj.type}`);
    }
    stateHistory.push(stateCopy);
  };

  return stateHistory;
}

module.exports = transformStateWithClones;
