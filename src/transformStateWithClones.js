'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const copiedState = { ...state };
  const result = [];

  for (const k in actions) {
    switch (actions[k].type) {
      case 'removeProperties':
        for (const key of actions[k].keysToRemove) {
          delete copiedState[key];
        }
        result.push(copiedState);
        break;

      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        }
        result.push(copiedState);
        break;

      default:
        Object.assign(copiedState, actions[k].extraData);
        result.push(copiedState);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
