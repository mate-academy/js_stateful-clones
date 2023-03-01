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
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        for (const keys of action.keysToRemove) {
          delete stateClone[keys];
        }
        break;
      case 'clear':
        stateClone = {};
        break;
      default:
        throw Error('action type is invalid');
    }
    result.push({ ...stateClone });
  }

  return result;
}

module.exports = transformStateWithClones;
