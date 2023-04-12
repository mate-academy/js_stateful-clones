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
  const transform = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key =>
          delete clone[key]);
        break;
      case 'clear':
        Object.keys(clone).forEach(key =>
          delete clone[key]);
        break;
      default:
        break;
    }

    transform.push({ ...clone });
  }

  return transform;
}

module.exports = transformStateWithClones;
