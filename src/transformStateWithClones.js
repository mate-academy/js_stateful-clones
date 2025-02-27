'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(clone, action.extraData);
      stateVersions.push({ ...clone });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach(function (key) {
        delete clone[key];
      });
      stateVersions.push({ ...clone });
    }

    if (action.type === 'clear') {
      Object.keys(clone).forEach(function (key) {
        delete clone[key];
      });
      stateVersions.push({ ...clone });
    }
  }

  return stateVersions;
}
module.exports = transformStateWithClones;
