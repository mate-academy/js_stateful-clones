'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const stateClones = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete newState[key]);
        break;
      case 'clear':
        Object.keys(newState).forEach(key => delete newState[key]);
        break;
    }
    stateClones.push({ ...newState });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
