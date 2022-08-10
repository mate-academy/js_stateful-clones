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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'removeProperties':
        for (const property of actions[i].keysToRemove) {
          delete copyState[property];
        }
        break;
      case 'addProperties':
        Object.assign(copyState, actions[i].extraData);
        break;
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
