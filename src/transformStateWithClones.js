'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesAllVersions = [];
  const stateTemporaryVersion = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateTemporaryVersion, action.extraData);
    }

    if (action.type === 'clear') {
      Object.keys(stateTemporaryVersion).forEach((key) => {
        delete stateTemporaryVersion[key];
      });
    }

    if (action.type === 'removeProperties') {
      action.keysToRemove.forEach((prop) => {
        delete stateTemporaryVersion[prop];
      });
    }

    const stateVersion = { ...stateTemporaryVersion };

    statesAllVersions.push(stateVersion);
  }

  return statesAllVersions;
}

module.exports = transformStateWithClones;
