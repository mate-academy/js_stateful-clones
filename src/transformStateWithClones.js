'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const property in action.extraData) {
          stateClone[property] = action.extraData[property];
        };
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete stateClone[property];
        };
        break;

      case 'clear':
        for (const property in stateClone) {
          delete stateClone[property];
        };
        break;

      default:
        throw new Error('Invalid input value');
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
