'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copyState = { ...state };
  const stateChangeLog = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties' :
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties' :
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear' :
        for (const property in copyState) {
          delete copyState[property];
        }
        break;

      default :
        return null;
    }
    stateChangeLog.push({ ...copyState });
  }

  return stateChangeLog;
}

module.exports = transformStateWithClones;
