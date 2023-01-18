'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'removeProperties':

        for (const remove of action.keysToRemove) {
          delete stateClone[remove];
        }
        break;

      case 'addProperties':

        Object.assign(stateClone, action.extraData);

        break;

      case 'clear':

        stateClone = {};
        break;
      default:
        throw new Error('Unknown action type');
    }
    result.push({ ...stateClone });
  }

  return result;
}
module.exports = transformStateWithClones;
