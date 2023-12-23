'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}\
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = Object.assign({}, state);

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
