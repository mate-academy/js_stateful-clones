'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arrayOfCopyState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      default: break;
    }
    arrayOfCopyState.push({ ...copyState });
  }

  return arrayOfCopyState;
}

module.exports = transformStateWithClones;
