'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;
      case 'clear':
        for (const val in clone) {
          delete clone[val];
        }
        break;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
