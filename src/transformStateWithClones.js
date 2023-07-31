'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];

  for (const action of actions) {
    const lastVersion = stateVersions.length - 1;
    const copyState = !stateVersions.length
      ? { ...state }
      : { ...stateVersions[lastVersion] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;
      default:
        break;
    }
    stateVersions.push(copyState);
  };

  return stateVersions;
}

module.exports = transformStateWithClones;
