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
        newState = Object.assign({}, newState, extraData);
        break;

      case 'removeProperties':
        newState = Object.fromEntries(
          Object.entries(newState).filter(([k]) => !keysToRemove.includes(k)),
        );

        break;
      case `clear`:
        newState = {};
        break;
      default:
        throw new Error(`Unknown action type: ${type}`);
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
