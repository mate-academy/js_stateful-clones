'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }
        break;

      case 'addProperties':
        Object.assign(clone, action.extraData);
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
