'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete copyState[remove];
        }
        break;

      case 'clear':
        for (const el in copyState) {
          delete copyState[el];
        }
        break;

      default:
        return copyState;
    }
    result.push({ ...copyState });
  }

  return result;
}
module.exports = transformStateWithClones;
