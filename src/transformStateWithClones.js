'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const tempState = { ...state };
  const previousVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(tempState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tempState[key];
        }
        break;

      case 'clear':
        for (const key in tempState) {
          delete tempState[key];
        }
        break;
      default:
        break;
    }
    previousVersions.push({ ...tempState });
  }

  return previousVersions;
}

module.exports = transformStateWithClones;
