'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateArray = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }

        break;

      default:
        break;
    }
    stateArray.push({ ...newState });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
