'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const types = [];
  const store = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': Object.assign(store, action.extraData);
        break;
      case 'removeProperties':
        if (action.keysToRemove.length > 0) {
          for (const key of action.keysToRemove) {
            delete store[key];
          }
        }
        break;

      case 'clear':
        for (const key in store) {
          delete store[key];
        }
        break;
      default: throw new Error('Error');
    }

    types.push({ ...store });
  }

  return types;
}

module.exports = transformStateWithClones;
