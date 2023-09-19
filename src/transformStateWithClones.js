'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let copy = Object.assign({}, state);

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
        copy = {};
        break;
      default:
        break;
    }
    res.push({ ...copy });
  }

  return res;
}

module.exports = transformStateWithClones;
