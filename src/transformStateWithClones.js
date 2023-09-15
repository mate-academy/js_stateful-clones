'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const endState = [];
  let newState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(newState, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let k = 0; k < actions[i].keysToRemove.length; k++) {
          delete newState[actions[i].keysToRemove[k]];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    const secState = { ...newState };

    endState.push(secState);
  }

  return endState;
}

module.exports = transformStateWithClones;
