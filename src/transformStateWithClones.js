'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let stateCopy = {};
  const stateHistory = [];

  Object.assign(stateCopy, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete stateCopy[remove];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      default:
        return 'There is no such type';
    }
    stateHistory.push({ ...stateCopy });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
