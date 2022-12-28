'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateClone[key]);
        break;
      case 'clear':
        stateClone = {};
        break;
      default:
        break;
    }
    stateClones.push({ ...stateClone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
