'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const changedState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(changedState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete changedState[property];
        }
        break;

      case 'clear':
        const keys = Object.keys(changedState);

        for (const key of keys) {
          delete changedState[key];
        }
        break;

      default:
        break;
    }
    stateVersions.push({ ...changedState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
