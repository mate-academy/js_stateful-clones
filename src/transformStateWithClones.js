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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'removeProperties':
        if (typeof (keysToRemove) === 'object') {
          for (const key of keysToRemove) {
            delete CopyOfState[key];
          }
        } else {
          delete CopyOfState[action.keysToRemove];
        }
        break;
      case 'addProperties':
        Object.assign(CopyOfState, extraData);
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
