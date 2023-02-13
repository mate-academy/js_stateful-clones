'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;
      case 'removeProperties':
        for (const remove of keysToRemove) {
          delete newState[remove];
        };
        break;
      case 'clear':
        newState = {};
        break;
      default:
        break;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
