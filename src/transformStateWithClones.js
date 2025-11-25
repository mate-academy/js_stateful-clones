'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [];
  let oneIterationState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        oneIterationState = {
          ...oneIterationState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => {
          delete oneIterationState[key];
        });
        break;
      case 'clear':
        Object.keys(oneIterationState).forEach(
          (key) => delete oneIterationState[key],
        );
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }
    allStates.push({ ...oneIterationState });
  }

  return allStates;
}

module.exports = transformStateWithClones;
