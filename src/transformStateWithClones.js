'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let stateClone = {
    ...state,
  };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':

        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':

        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:
        return `Error: ${type}`;
    }
    resultArray.push({ ...stateClone });
  }

  return resultArray;
}

module.exports = transformStateWithClones;
