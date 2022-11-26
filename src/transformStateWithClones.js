'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = [];
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
        for (const clean in clone) {
          delete clone[clean];
        }
        break;

      default:
        break;
    }
    transformedState.push({ ...clone });
  }

  return transformedState;
}

module.exports = transformStateWithClones;
