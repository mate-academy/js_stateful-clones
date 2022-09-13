'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete copyState[keyToRemove];
        }
        break;

      case 'clear':
        const keysToClear = Object.keys(copyState);

        for (const keyToClear of keysToClear) {
          delete copyState[keyToClear];
        }
        break;

      default:
        return 'Error!';
    }
    statesArray.push({ ...copyState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
