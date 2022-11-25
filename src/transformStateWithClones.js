'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [{ ...state }];
  let check = 0;

  for (const action of actions) {
    if (check !== 0) {
      stateCopy[check] = {};

      for (const key in stateCopy[check - 1]) {
        stateCopy[check][key] = stateCopy[check - 1][key];
      }
    }

    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy[check], action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[check][key];
        }
        break;

      default:
        for (const key in stateCopy[check]) {
          delete stateCopy[check][key];
        }
    }
    check++;
  }

  return stateCopy;
}
module.exports = transformStateWithClones;
