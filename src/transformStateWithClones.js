'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const newArray = [];

  for (const index of actions) {
    switch (index.type) {
      case 'addProperties':
        copyState = {
          ...copyState,
          ...index.extraData,
        };
        break;

      case 'removeProperties':
        for (const trash of index.keysToRemove) {
          delete copyState[trash];
        }
        break;

      case 'clear':
        for (const key1 in copyState) {
          delete copyState[key1];
        }
        break;

      default:
        break;
    }

    newArray.push({ ...copyState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
