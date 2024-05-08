'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let localState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action; // Object destructuring

    switch (type) {
      case 'addProperties':
        localState = { ...localState, ...extraData };
        result.push({ ...localState });
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete localState[key];
        }
        result.push({ ...localState }); // Clone localState before pushing
        break;
      case 'clear':
        localState = {};
        result.push({ ...localState }); // Clone localState before pushing
        break;
      default:
        throw new Error('Unknown action type');
    }
  }

  return result;
}

module.exports = transformStateWithClones;
