'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *git
 * @return {Object[]}
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function transformStateWithClones(state, actions) {
  let stateCopy = deepClone(state);
  const stateHistory = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
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
        throw new Error(`Unhandled action type: ${action.type}`);
    }

    stateHistory.push(deepClone(stateCopy));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
