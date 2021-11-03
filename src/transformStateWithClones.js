'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const iterator of actions) {
    const { type, extraData, keysToRemove } = iterator;

    switch (type) {
      case 'addProperties':
        newState = {...newState, ...extraData};
        break;
      case 'removeProperties':
        for (const iter of keysToRemove) {
          delete newState[iter];
        }
        break;
      case 'clear':
        newState = {};
        break;
      default:
        return arr;
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
