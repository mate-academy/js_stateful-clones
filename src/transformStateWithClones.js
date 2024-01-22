'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
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
        break;
    }
    stateVersions.push(stateClone);
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
