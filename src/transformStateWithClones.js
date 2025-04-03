'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const finalState = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        newState = Object.assign(newState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let i2 = 0; i2 < actions[i].keysToRemove.length; i2++) {
          const val = actions[i].keysToRemove[i2];

          delete newState[val];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }
    finalState.push({ ...newState });
  }

  return finalState;
}

module.exports = transformStateWithClones;
