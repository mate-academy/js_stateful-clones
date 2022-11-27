'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let cloneState = Object.assign({}, state);
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;

      case 'clear':
        cloneState = {};
        break;

      default:
        throw new Error('action is not supported');
    }
    result.push({ ...cloneState });
  }

  return result;
}

module.exports = transformStateWithClones;
