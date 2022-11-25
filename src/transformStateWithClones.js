'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateClone = { ...stateClone };
        Object.assign(stateClone, action.extraData);
        break;

      case 'removeProperties':
        stateClone = { ...stateClone };
        action.keysToRemove.forEach(key => delete stateClone[key]);
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        throw new Error('action is not supported');
    }
    result.push(stateClone);
  }

  return result;
}

module.exports = transformStateWithClones;
