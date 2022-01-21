'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CopyOfState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        if (typeof (action.keysToRemove) === 'object') {
          for (const key of action.keysToRemove) {
            delete CopyOfState[key];
          }
        } else {
          delete CopyOfState[action.keysToRemove];
        }
        break;
      case 'addProperties':
        Object.assign(CopyOfState, action.extraData);
        break;

      case 'clear' :
        for (const properties in CopyOfState) {
          delete CopyOfState[properties];
        }
        break;

      default:
        throw Error;
    }

    result.push({ ...CopyOfState });
  }

  return result;
}

module.exports = transformStateWithClones;
