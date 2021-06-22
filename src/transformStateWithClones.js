'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const transformedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        (action.keysToRemove).forEach(key => delete stateClone[key]);
        break;
      case 'clear':
        Object.keys(stateClone).forEach(key => delete stateClone[key]);
        break;
      default:
        break;
    }

    transformedStates.push({ ...stateClone });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
