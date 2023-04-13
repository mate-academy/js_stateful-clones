'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let clone = { ...state };
  const transformedStates = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case 'addProperties':
        Object.assign(clone, extraData);
        break;
      case 'removeProperties':
        keysToRemove.forEach(key =>
          delete clone[key]);
        break;
      case 'clear':
        clone = {};
        break;
      default:
        return 'Unknown action type';
    }

    transformedStates.push({ ...clone });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
