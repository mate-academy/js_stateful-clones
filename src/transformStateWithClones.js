'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  let workingObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        workingObject = {};
        break;
      case 'addProperties':
        Object.assign(workingObject, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in workingObject) {
            delete workingObject[key];
          }
        }
        break;
      default:
        break;
    }
    stateHistory.push({ ...workingObject });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
