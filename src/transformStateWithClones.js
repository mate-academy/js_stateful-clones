'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  let result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        for (const index in action.keysToRemove) {
          delete stateClone[action.keysToRemove[index]];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        result = 'action type not found';
    } result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
