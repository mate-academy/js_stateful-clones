'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const FINAL_STATES = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        break;

      case 'removeProperties':
        newState = { ...newState };

        for (const deleteKey of action.keysToRemove) {
          delete newState[deleteKey];
        }
        break;

      case 'clear':
        newState = {};
        break;
      default:
        break;
    }

    FINAL_STATES.push(newState);
  }

  return FINAL_STATES;
}

module.exports = transformStateWithClones;
