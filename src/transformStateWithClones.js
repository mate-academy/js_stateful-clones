'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let newState = {
    ...state,
  };
  const resArray = [];

  for (const action of actions) {
    newState = {
      ...newState,
    };

    switch (action['type']) {
      case 'addProperties':
        Object.assign(newState, action['extraData']);
        resArray.push(newState);
        break;

      case 'removeProperties':
        for (const key of action['keysToRemove']) {
          delete newState[key];
        }
        resArray.push(newState);

        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        resArray.push(newState);
        break;

      default:
        break;
    }
  }

  return resArray;
}

module.exports = transformStateWithClones;
