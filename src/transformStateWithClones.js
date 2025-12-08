'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          if (newState.hasOwnProperty(key)) {
            delete newState[key];
          }
        }

        break;
      case `clear`:
        newState = {};
        break;
      default:
        break;
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
