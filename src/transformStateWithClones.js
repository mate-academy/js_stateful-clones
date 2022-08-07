'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const parts of actions) {
    switch (parts.type) {
      case 'addProperties':
        Object.assign(copyState, parts.extraData);
        break;

      case 'removeProperties':
        for (const key of parts.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
