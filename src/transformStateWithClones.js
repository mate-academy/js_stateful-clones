'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete newState[key]);
        break;
      case 'clear':
        newState = {};
        break;

      default:
        break;
    }
    stateClone.push({ ...newState });
  }

  return stateClone;
}

module.exports = transformStateWithClones;
