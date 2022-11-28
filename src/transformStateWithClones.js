'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const propertyToRemove of action.keysToRemove) {
          delete copyState[propertyToRemove];
        }
        break;

      case 'clear':
        for (const keyToRemove in copyState) {
          delete copyState[keyToRemove];
        }
        break;

      default:
        break;
    }

    states.push({ ...copyState });
  }

  return states;
}

module.exports = transformStateWithClones;
