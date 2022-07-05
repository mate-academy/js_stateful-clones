'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const objectForUse = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objectForUse, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete objectForUse[key];
        };
        break;

      case 'clear':
        for (const key in objectForUse) {
          delete objectForUse[key];
        };
        break;

      default:
        throw new Error('error');
    }
    arr.push(Object.assign({}, objectForUse));
  }

  return arr;
}

module.exports = transformStateWithClones;
