'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let newState = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newState = Object.assign(newState, action.extraData);
        break;

      case 'clear':
        for (const member in newState) {
          delete newState[member];
        }
        break;

      case 'removeProperties':
        for (const removingProperty of action.keysToRemove) {
          delete newState[removingProperty];
        }
        break;
    }

    const addingState = {
      ...newState,
    };

    result.push(addingState);
  }

  return result;
}

module.exports = transformStateWithClones;
