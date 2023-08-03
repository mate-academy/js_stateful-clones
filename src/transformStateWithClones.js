'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @return {Object[]} */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  const tempState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete tempState[key];
        });
        break;

      case 'clear':
        Object.keys(tempState).forEach((key) => {
          delete tempState[key];
        });
        break;

      default:
        throw new Error(
          'unknown "type" of "action" from "@param {Object[]} actions"');
    }

    stateArray.push({ ...tempState });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
