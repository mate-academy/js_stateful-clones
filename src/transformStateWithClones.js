'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let clonedState = { ...state };
  const states = [];

  for (let n = 0; n < actions.length; n++) {
    switch (actions[n].type) {
      case 'addProperties':
        Object.assign(clonedState, actions[n].extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < actions[n].keysToRemove.length; i++) {
          delete clonedState[actions[n].keysToRemove[i]];
        }

        break;

      case 'clear':
        clonedState = {};

        break;

      default:
        return 'ERROR: Incorrect Action';
    }

    states.push({ ...clonedState });
  }

  return states;
}

module.exports = transformStateWithClones;
