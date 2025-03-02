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
        for (const x of actions[k].keysToRemove) {
          delete copiedState[x];
        }
        break;
      case 'clear':
        for (const y in copiedState) {
          delete copiedState[y];
        }
        break;
      default:
        Object.assign(copiedState, actions[k].extraData);
        break;
    }
    result.push({ ...copiedState });
  }

  return result;
}

module.exports = transformStateWithClones;
