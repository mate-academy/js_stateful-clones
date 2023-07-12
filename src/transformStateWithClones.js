'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let copyState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete copyState[key]);
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        break;
    }
    stateVersions.push({ ...copyState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
