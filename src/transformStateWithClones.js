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
  let newStateObject = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        newStateObject = {
          ...newStateObject,
          ...extraData,
        };
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
    }

    cloneTransformsState.push({ ...newStateObject });
  }

  return cloneTransformsState;
}

module.exports = transformStateWithClones;
