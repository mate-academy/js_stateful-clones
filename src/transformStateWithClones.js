'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete clone[remove];
        }
        break;

      case 'clear':
        for (const clear in clone) {
          delete clone[clear];
        }
        break;

      default:
        return clone;
    }
    result.push(Object.assign({}, clone));
  }

  return result;
}

module.exports = transformStateWithClones;
