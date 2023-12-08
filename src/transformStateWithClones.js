'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);

        break;

      case 'removeProperties':
        for (const propertyToRemove of actions.keysToRemove) {
          delete copyState[propertyToRemove];
        }

        break;

      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }

        break;

      default:

        break;
    }
  }
}

module.exports = transformStateWithClones;
