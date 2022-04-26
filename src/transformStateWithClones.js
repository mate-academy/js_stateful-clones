'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const prevVersion = [];
  const output = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(output, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete output[key];
        }
        break;

      case 'clear':
        for (const key in output) {
          delete output[key];
        }
        break;

      default:
        return null;
    }

    prevVersion.push({ ...output });
  }

  return prevVersion;
}

module.exports = transformStateWithClones;
