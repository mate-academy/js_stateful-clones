'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete copyState[removeKey];
        }
        break;
      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        break;
      default:
        throw new Error('Type error!');
    }
    result.push({ ...copyState });
  }

  return result;
}
module.exports = transformStateWithClones;
