'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const resultState = [];

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
        for (const part in clone) {
          delete clone[part];
        }
        break;
      default:
        throw new Error('Wrong');
    }
    resultState.push({ ...clone });
  }

  return resultState;
}

module.exports = transformStateWithClones;
