'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        };
        break;

      default:
        for (const key in copy) {
          delete copy[key];
        };
        break;
    }

    arr.push({ ...copy });
  }

  return arr; // 123
}

module.exports = transformStateWithClones;
