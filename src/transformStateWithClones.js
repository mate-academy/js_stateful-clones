'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateCopy = { ...state };
  const stateChangeLog = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear' :
        for (const property in stateCopy) {
          delete stateCopy[property];
        }
        break;

      default :
        return null;
    }
    stateChangeLog.push({ ...stateCopy });
  }

  return stateChangeLog;
}

module.exports = transformStateWithClones;
