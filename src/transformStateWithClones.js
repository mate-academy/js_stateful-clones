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
    if (n.type === 'addProperties') {
      const newState = { ...(result[result.length - 1] || state) };

      Object.assign(newState, n.extraData);
      result.push(newState);
    } else if (n.type === 'removeProperties') {
      const newState = { ...(result[result.length - 1] || state) };

      for (const i of n.keysToRemove) {
        delete newState[i];
      }
      result.push(newState);
    } else if (n.type === 'clear') {
      const newState = {};

      result.push(newState);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
