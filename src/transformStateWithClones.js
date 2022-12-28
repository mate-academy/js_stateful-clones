'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const keys in action.extraData) {
          stateClone[keys] = action.extraData[keys];
        }
        break;

      case 'removeProperties':
        for (const properties of action.keysToRemove) {
          delete stateClone[properties];
        }
        break;

      case 'clear':
        for (const keys in stateClone) {
          delete stateClone[keys];
        }
        break;

      default:
        throw Error('error');
    }

    const newObj = { ...stateClone };

    result.push(newObj);
  }

  return result;
}
module.exports = transformStateWithClones;
