'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let ownState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(ownState, extraData);
        break;

      case 'clear':
        ownState = {};
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete ownState[key];
        }
        break;

      default:
        return 'Error';
    }
    arr.push({ ...ownState });
  }

  return arr;
}

module.exports = transformStateWithClones;
