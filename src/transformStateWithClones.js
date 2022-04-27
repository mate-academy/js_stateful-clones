'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const arr = [];

  for (const key in actions) {
    switch (actions[key].type) {
      case 'addProperties':
        Object.assign(cloneState, actions[key].extraData);
        break;
      case 'removeProperties':
        for (const el of actions[key].keysToRemove) {
          delete cloneState[el];
        }
        break;
      case 'clear':
        for (const el in cloneState) {
          delete cloneState[el];
        }
        break;
      default:
        break;
    }
    arr.push({ ...cloneState });
  }

  return arr;
}

module.exports = transformStateWithClones;
