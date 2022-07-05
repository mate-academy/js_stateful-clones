'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
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

      case 'addProperties':
        Object.assign(stateClone, action.extraData);

        break;

      default:
        break;
    }

    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
