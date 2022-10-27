'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete copyState[keyToRemove];
        };
        break;

      case 'clear':
        for (const keyToRemove in copyState) {
          delete copyState[keyToRemove];
        }
        break;

      default:
        throw new Error('Unverifiable action');
    }
    stateVersions.push(Object.assign({}, copyState));
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
