'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        result[i] = { ...Object.assign(currentState, actions[i].extraData) };
        break;
      case 'removeProperties':
        for (let y = 0; y < actions[i].keysToRemove.length; y++) {
          delete currentState[actions[i].keysToRemove[y]];
        }
        result[i] = { ...currentState };
        break;

      case 'clear':
        Object.keys(currentState).forEach((key) => delete currentState[key]);
        result[i] = { ...currentState };
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
