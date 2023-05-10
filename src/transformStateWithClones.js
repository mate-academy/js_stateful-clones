'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const key of actions) {
    const { type, extraData, keysToRemove } = key;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        result.push({ ...copyState });
        break;

      case 'removeProperties':
        for (const item of keysToRemove) {
          delete copyState[item];
        }
        result.push({ ...copyState });
        break;

      default:
        for (const prop in copyState) {
          delete copyState[prop];
        }
        result.push({ ...copyState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
