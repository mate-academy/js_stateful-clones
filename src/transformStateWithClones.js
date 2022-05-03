'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *  1`1
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const newState = { ...state };

  for (let j = 0; j < actions.length; j++) {
    switch (actions[j].type) {
      case 'addProperties':
        Object.assign(newState, actions[j].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[j].keysToRemove) {
          delete newState[key];
        }
        break;

      case 'clear':
        for (const key1 in newState) {
          delete newState[key1];
        }
        break;
      default:
        break;
    }
    res.push({ ...newState });
  }

  return res;
}

module.exports = transformStateWithClones;
