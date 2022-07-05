'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in copy) {
            delete copy[key];
          }
        }
        break;

      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;

      default:
        break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
