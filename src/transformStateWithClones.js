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
        Object.assign(copy, action.extraData)
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;

      default: throw new Error ('Unknown action type');
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
