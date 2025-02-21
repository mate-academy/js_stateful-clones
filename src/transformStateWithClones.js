'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const n of actions) {
    let newState = { ...(result[result.length - 1] || state) };

    switch (n.type) {
      case 'addProperties':
        Object.assign(newState, n.extraData);
        break;

      case 'removeProperties':
        for (const i of n.keysToRemove) {
          delete newState[i];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        continue;
    }

    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
