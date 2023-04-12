'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'clear':
        for (const del in clone) {
          delete clone[del];
        }
        break;
      default:
        return 'Error';
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
