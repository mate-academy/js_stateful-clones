'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allVersions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action['extraData']);
    }

    if (action.type === 'removeProperties') {
      for (const key of action['keysToRemove']) {
        delete stateCopy[key];
      }
    }

    if (action.type === 'clear') {
      for (const char in stateCopy) {
        delete stateCopy[char];
      }
    }

    allVersions.push({ ...stateCopy });
  }

  return allVersions;
}

module.exports = transformStateWithClones;
