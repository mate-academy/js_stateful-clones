'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyOfState[key];
        }
        break;
      case 'addProperties':
        Object.assign(copyOfState, extraData);
        break;

      case 'clear' :
        for (const properties in copyOfState) {
          delete copyOfState[properties];
        }
        break;

      default:
        throw Error;
    }

    result.push({ ...copyOfState });
  }

  return result;
}

module.exports = transformStateWithClones;
