'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = [];
  let prevState = { ...state };

  for (const action of actions) {
    let stateCopy;

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties': {
        const extra =
          action.extraData && typeof action.extraData === 'object'
            ? action.extraData
            : {};

        stateCopy = { ...prevState, ...extra };

        break;
      }

      case 'removeProperties': {
        const keys = Array.isArray(action.keysToRemove)
          ? action.keysToRemove
          : [];

        stateCopy = { ...prevState };

        for (const k of keys) {
          if (k in stateCopy) {
            delete stateCopy[k];
          }
        }
        break;
      }

      default:
        stateCopy = { ...prevState };
    }

    stateHistory.push(stateCopy);
    prevState = stateCopy;
  }

  return stateHistory;
}
module.exports = transformStateWithClones;
