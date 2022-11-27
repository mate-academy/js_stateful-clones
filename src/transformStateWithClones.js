'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const copy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copy, extraData);
        stateArray.push({ ...copy });
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copy[key];
        }

        stateArray.push({ ...copy });
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }

        stateArray.push({ ...copy });
        break;

      default:
        throw new Error(`Type ${type} is invalid!`);
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
