'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  let updatedState = { ...state };

  for (const action of actions) {
    updatedState = { ...updatedState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(updatedState, action.extraData);
        statesArray.push(updatedState);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete updatedState[key];
        }
        statesArray.push(updatedState);
        break;

      case 'clear':
        for (const key in updatedState) {
          delete updatedState[key];
        }
        statesArray.push(updatedState);
        break;
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
