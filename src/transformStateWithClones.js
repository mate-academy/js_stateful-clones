'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const versionOfState = [];
  const copyOfState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;

      default:
        throw Error('unknown action type');
    }
    versionOfState.push({ ...copyOfState });
  }

  return versionOfState;
}

module.exports = transformStateWithClones;
