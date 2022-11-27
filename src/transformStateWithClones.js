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
        stateVersions.push({ ...changedState });
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete changedState[property];
        }
        stateVersions.push({ ...changedState });
        break;

      case 'clear':
        const keys = Object.keys(changedState);

        for (const key of keys) {
          delete changedState[key];
        }
        stateVersions.push({ ...changedState });
        break;

      default:
        break;
    }
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
