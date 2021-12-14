'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateClone, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateClone[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateClone) {
        delete stateClone[key];
      }
    }

    stateVersions.push({ ...stateClone });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
