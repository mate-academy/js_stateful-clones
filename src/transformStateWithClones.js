'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let stateClone = { ...state };

  for (const action of actions) {
    for (const par in action) {
      switch (action[`${par}`]) {
        case 'addProperties':
          for (const data in action.extraData) {
            stateClone[`${data}`] = action.extraData[`${data}`];
          }
          stateHistory.push({ ...stateClone });
          break;

        case 'removeProperties':
          for (const data in action.keysToRemove) {
            delete stateClone[action.keysToRemove[`${data}`]];
          }
          stateHistory.push({ ...stateClone });
          break;

        case 'clear':
          stateClone = {};
          stateHistory.push({ ...stateClone });
          break;

        default:
          break;
      }
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
