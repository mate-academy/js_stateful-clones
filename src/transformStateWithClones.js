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

  for (const variants of actions) {
    const { type, extraData, keysToRemove } = variants;

    switch (type) {
      case 'addProperties':
        for (const data in extraData) {
          stateVersion[data] = extraData[data];
        }

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

      default:
        break;
    }

    result.push({ ...stateVersion });
  }

  return result;
}

module.exports = transformStateWithClones;
