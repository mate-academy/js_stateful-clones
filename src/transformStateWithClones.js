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
        for (const keyToRemove of action.keysToRemove) {
          delete copy[keyToRemove];
        }
        break;

      case 'clear':
        for (const name in copy) {
          delete copy[name];
        }
        break;
    }

    arr.push({ ...copy });
  }

  return arr;
}

module.exports = transformStateWithClones;
