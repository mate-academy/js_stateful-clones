'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let result = { ...state };
  let history = []
  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        result = {};
        break;
      case 'addProperties':
        Object.assign(result, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete result[key]);
        break;
      default:
        break;
    }
    history.push({ ...result });
  }

  return history;
}

module.exports = transformStateWithClones;