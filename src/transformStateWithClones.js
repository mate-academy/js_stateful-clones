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
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        stateArray.push({ ...copy });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
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
        throw new Error(`Type ${action.type} is invalid!`);
    }
  }

  return stateArray;
}

module.exports = transformStateWithClones;
