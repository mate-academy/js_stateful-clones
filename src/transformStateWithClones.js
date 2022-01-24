'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateList = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;

      case 'removeProperties':
        for (const removableKey of keysToRemove) {
          delete stateClone[removableKey];
        }
        break;

      default:
    }
    stateList.push({ ...stateClone });
  }

  return stateList;
}

module.exports = transformStateWithClones;
