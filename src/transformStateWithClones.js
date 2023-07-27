'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCloned = {
    ...state,
  };

  const transformedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCloned, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCloned[key]);
        break;

      case 'clear':
        Object.keys(stateCloned).forEach(key => delete stateCloned[key]);
        break;

      default:
        throw new Error('Unknown action type');
    }

    transformedStates.push({
      ...stateCloned,
    });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
