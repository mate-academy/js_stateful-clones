'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let actualState = { ...state };

  for (const act of actions) {
    let stateCopy = { ...actualState };

    switch (act.type) {
      case 'addProperties':
        for (const key in act.extraData) {
          stateCopy[key] = act.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default: {
        throw new Error('Invalid action type added.');
      }
    }
    actualState = stateCopy;
    stateHistory.push({ ...actualState });
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
