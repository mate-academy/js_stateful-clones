'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const transformedState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          stateClone[data] = action.extraData[data];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;

      default:
        throw new Error(`There is no such action type: ${action.type}`);
    }

    transformedState.push({ ...stateClone });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
