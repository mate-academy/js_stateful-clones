'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
      case 'addProperties':
        for (const item in action) {
          if (item === 'extraData') {
            Object.assign(copy, action[item]);
          }
        }
        break;

      case 'removeProperties':
        for (const key of action['keysToRemove']) {
          delete copy[key];
        }
        break;

      default: return 'Something went wrong!';
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
