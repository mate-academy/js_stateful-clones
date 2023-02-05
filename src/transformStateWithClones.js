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
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete clone[remove];
        }
        break;

      case 'clear':
        for (const clear in clone) {
          delete clone[clear];
        }
        break;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
