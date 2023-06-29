'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const cloneTransformsState = [];
  const newStateObject = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newStateObject, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete newStateObject[key];
        }
        break;

      case 'clear':
        for (const key in newStateObject) {
          delete newStateObject[key];
        }
        break;

      default:
        return 0;
    }

    cloneTransformsState.push({ ...newStateObject });
  }

  return cloneTransformsState;
}

module.exports = transformStateWithClones;
