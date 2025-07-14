'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateHistory = {};
  const stateVersions = [];

  Object.assign(stateHistory, state);

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      for (const value in obj.extraData) {
        stateHistory[value] = obj.extraData[value];
      }
    }

    if (obj.type === 'removeProperties') {
      for (const key of obj.keysToRemove) {
        delete stateHistory[key];
      }
    }

    if (obj.type === 'clear') {
      for (const clear in stateHistory) {
        delete stateHistory[clear];
      }
    }
    stateVersions.push({ ...stateHistory });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
