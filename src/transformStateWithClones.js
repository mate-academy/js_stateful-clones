'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateVersion = { ...state };

  for (const variant of actions) {
    const { type, extraData, keysToRemove } = variant;

    switch (type) {
      case 'addProperties':
        Object.assign(stateVersion, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateVersion[key];
        }
        break;

      case 'clear':
        for (const key in stateVersion) {
          delete stateVersion[key];
        }
        break;
    }
    result.push({ ...stateVersion });
  }

  return result;
}

module.exports = transformStateWithClones;
