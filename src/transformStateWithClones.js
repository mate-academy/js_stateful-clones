'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
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
        Object.keys(clone).forEach(key =>
          delete clone[key]);
        break;
    }

    transformedStates.push({ ...clone });
  }

  return transformedStates;
}

module.exports = transformStateWithClones;
