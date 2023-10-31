'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = { ...state };
  const versions = [];

  for (const ch of actions) {
    if (ch.type === 'addProperties') {
      newState = Object.assign(newState, ch.extraData);
      versions.push({ ...newState });
    }

    if (ch.type === 'removeProperties') {
      for (const hc of ch.keysToRemove) {
        delete newState[hc];
      }
      versions.push({ ...newState });
    }

    if (ch.type === 'clear') {
      newState = {};
      versions.push({ ...newState });
    }
  }

  return versions;
}

module.exports = transformStateWithClones;
