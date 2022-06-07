'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const clonestateArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(cloneState, extraData);
        break;

      case 'removeProperties':
        for (const toRemove of keysToRemove) {
          delete cloneState[toRemove];
        }
        break;
      case 'clear':
        cloneState = {};
        break;
    }
    clonestateArray.push({ ...cloneState });
  }

  return clonestateArray;
}

module.exports = transformStateWithClones;
